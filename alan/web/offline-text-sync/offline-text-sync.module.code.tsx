"use client"

import {
  POSITION_WRITE_EVENT,
  parsePositionWriteDetail,
} from "@akasha/pages-ui-components/position-write-event"
import { getContentPersistence } from "@akasha/pages-ui-store/singleton"
import { selectReadAheadChapterIds, selectUnreadChapters } from "@akasha/reading/chapter-choosing"
import {
  loadChapterForOffline,
  loadEagerCarveoutStoryIds,
  loadReadingActiveStoryIds,
  writeChapterCompletion,
  writeChapterPosition,
} from "@akasha/reading/offline-reading"
import { loadStoryCatalog } from "@akasha/reading/story-catalog"
import { useEffect, useRef } from "react"
import { isNativeShell } from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import {
  clearSyncedCompletions,
  clearSyncedPositions,
  readCompletionQueue,
  readPositionStore,
  writeLocalPosition,
} from "../offline-text/offline-text.module.code.ts"
import {
  chunk,
  completionPatches,
  OFFLINE_COMPLETIONS_CHANGED_EVENT,
  positionPatches,
} from "../offline-text-cache/offline-text-cache.module.code.ts"
import {
  describeThrown,
  reportReadCompletionDiag,
} from "../read-completion-diagnostics/read-completion-diagnostics.module.code.ts"

const DOWN_SYNC_CONCURRENCY = 5

const READ_AHEAD_CHAPTERS = 30

const TRICKLE_CONCURRENCY = 2
const TRICKLE_BATCH_DELAY_MS = 750

type LoadedChapter = Awaited<ReturnType<typeof loadChapterForOffline>>
type FetchOutcome = { ok: true; loaded: LoadedChapter } | { ok: false }

async function fetchChapterWithRetry(chapterId: string): Promise<FetchOutcome> {
  try {
    return { ok: true, loaded: await loadChapterForOffline(chapterId) }
  } catch {}
  try {
    return { ok: true, loaded: await loadChapterForOffline(chapterId) }
  } catch (error: unknown) {
    console.error("[offline-text-sync] chapter fetch failed after retry", chapterId, error)
    return { ok: false }
  }
}

export function OfflineTextSync() {
  const running = useRef(false)
  const rerunRequested = useRef(false)
  const completionDraining = useRef(false)
  const completionRerunRequested = useRef(false)

  useEffect(() => {
    if (!isNativeShell()) return

    let cancelled = false

    const drainCompletions = async (): Promise<void> => {
      if (completionDraining.current) {
        reportReadCompletionDiag("drain-skipped-busy")
        completionRerunRequested.current = true
        return
      }
      completionDraining.current = true
      try {
        const queue = await readCompletionQueue()
        const queuedCount = queue.entries.length
        if (queuedCount > 0) reportReadCompletionDiag("drain-attempt", `queued=${queuedCount}`)
        const synced: string[] = []
        let firstDrainError: string | undefined
        for (const patch of completionPatches(queue)) {
          if (cancelled) return
          const completedAtMs = Date.parse(patch.completedAt)
          if (Number.isNaN(completedAtMs)) {
            console.error("[offline-text-sync] dropping completion, unparseable ts", patch.pageId)
            synced.push(patch.pageId)
            continue
          }
          try {
            await writeChapterCompletion(patch.pageId, completedAtMs, patch.length)
            synced.push(patch.pageId)
          } catch (error: unknown) {
            console.error("[offline-text-sync] up-sync write failed", patch.pageId, error)
            if (firstDrainError == null) firstDrainError = describeThrown(error)
          }
        }
        await clearSyncedCompletions(synced)
        if (queuedCount > 0) {
          const failed = queuedCount - synced.length
          reportReadCompletionDiag(
            "drain-result",
            `synced=${synced.length} failed=${failed}${firstDrainError != null ? ` err=${firstDrainError}` : ""}`
          )
        }
      } finally {
        completionDraining.current = false
        if (!cancelled && completionRerunRequested.current) {
          completionRerunRequested.current = false
          void drainCompletions()
        }
      }
    }

    const sync = async (): Promise<void> => {
      if (running.current) {
        rerunRequested.current = true
        return
      }
      running.current = true
      try {
        await drainCompletions()
        if (cancelled) return

        const positionStore = await readPositionStore()
        const syncedPositions: { pageId: string; updatedAt: string }[] = []
        for (const patch of positionPatches(positionStore)) {
          if (cancelled) return
          try {
            await writeChapterPosition(patch.pageId, patch.progress)
            syncedPositions.push({ pageId: patch.pageId, updatedAt: patch.updatedAt })
          } catch (error: unknown) {
            console.error("[offline-text-sync] position up-sync failed", patch.pageId, error)
          }
        }
        await clearSyncedPositions(syncedPositions)

        const contentCache = getContentPersistence()
        const [activeIds, eagerIds] = await Promise.all([
          loadReadingActiveStoryIds(),
          loadEagerCarveoutStoryIds(),
        ])
        if (cancelled) return
        const eagerSet = new Set(eagerIds)
        const allStoryIds = [...new Set([...activeIds, ...eagerIds])]

        const contentCachedSet = new Set(
          contentCache === null ? [] : await contentCache.cachedIds()
        )
        const nearTermWork: string[] = []
        const backfillWork: string[] = []
        for (const storyId of allStoryIds) {
          if (cancelled) return
          const catalog = await loadStoryCatalog(storyId)
          const nearTerm = selectReadAheadChapterIds(catalog, storyId, READ_AHEAD_CHAPTERS)
          const fullSet = eagerSet.has(storyId)
            ? selectUnreadChapters(catalog, storyId).map((c) => c.id)
            : nearTerm
          contentCache?.pinPages(fullSet)
          const nearTermSet = new Set(nearTerm)
          for (const id of fullSet) {
            if (contentCachedSet.has(id)) continue
            if (nearTermSet.has(id)) nearTermWork.push(id)
            else backfillWork.push(id)
          }
        }

        const fetchBodies = async (
          ids: readonly string[],
          concurrency: number,
          interBatchDelayMs: number
        ): Promise<void> => {
          for (const batch of chunk(ids, concurrency)) {
            if (cancelled) return
            const fetched = await Promise.all(
              batch.map((chapterId) => fetchChapterWithRetry(chapterId))
            )
            for (let i = 0; i < batch.length; i++) {
              if (cancelled) return
              const chapterId = batch[i]
              const outcome = fetched[i]
              if (chapterId === undefined || outcome === undefined || !outcome.ok) continue
              if (outcome.loaded !== null && contentCache !== null) {
                contentCache.savePages([outcome.loaded])
              }
            }
            if (interBatchDelayMs > 0 && !cancelled) {
              await new Promise((resolve) => setTimeout(resolve, interBatchDelayMs))
            }
          }
        }

        await fetchBodies(nearTermWork, DOWN_SYNC_CONCURRENCY, 0)
        if (cancelled) return
        await fetchBodies(backfillWork, TRICKLE_CONCURRENCY, TRICKLE_BATCH_DELAY_MS)
        console.info(
          "[offline-text-sync] down-sync pass complete",
          `near-term=${nearTermWork.length} backfill=${backfillWork.length}`
        )
      } catch (error: unknown) {
        console.error("[offline-text-sync] down-sync failed", error)
      } finally {
        running.current = false
        if (!cancelled && rerunRequested.current) {
          rerunRequested.current = false
          void sync()
        }
      }
    }

    const onPositionWrite = (event: Event) => {
      if (!(event instanceof CustomEvent)) return
      const detail = parsePositionWriteDetail(event.detail)
      if (detail == null) return
      void writeLocalPosition(detail.pageId, detail.progress)
    }
    window.addEventListener(POSITION_WRITE_EVENT, onPositionWrite)

    void sync()
    const onOnline = () => {
      void sync()
    }
    const onCompletionsChanged = () => {
      void drainCompletions()
    }
    window.addEventListener("online", onOnline)
    window.addEventListener(OFFLINE_COMPLETIONS_CHANGED_EVENT, onCompletionsChanged)
    return () => {
      cancelled = true
      window.removeEventListener(POSITION_WRITE_EVENT, onPositionWrite)
      window.removeEventListener("online", onOnline)
      window.removeEventListener(OFFLINE_COMPLETIONS_CHANGED_EVENT, onCompletionsChanged)
    }
  }, [])

  return null
}
