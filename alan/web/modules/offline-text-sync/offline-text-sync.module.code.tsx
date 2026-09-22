"use client"

import {
  selectReadAheadChapterIds,
  selectUnreadChapters,
} from "akasha/alan/library/reading/modules/chapter-choosing/chapter-choosing.module.code.ts"
import {
  loadChapterForOffline,
  loadEagerCarveoutStoryIds,
  loadReadingActiveStoryIds,
} from "akasha/alan/library/reading/modules/offline-reading/offline-reading.module.code.ts"
import { loadStoryCatalog } from "akasha/alan/library/reading/modules/story-catalog/story-catalog.module.code.ts"
import { isNativeShell } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { writeLocalPosition } from "akasha/alan/web/modules/offline-text/offline-text.module.code.ts"
import { chunk } from "akasha/alan/web/modules/offline-text-cache/offline-text-cache.module.code.ts"
import {
  POSITION_WRITE_EVENT,
  parsePositionWriteDetail,
} from "akasha/page/ui/component/modules/position-write-event/position-write-event.module.code.ts"
import { getContentPersistence } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useEffect, useRef } from "react"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

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

  useEffect(() => {
    if (!isNativeShell()) return

    let cancelled = false

    const sync = async (): Promise<void> => {
      if (running.current) {
        rerunRequested.current = true
        return
      }
      running.current = true
      try {
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
    window.addEventListener("online", onOnline)
    return () => {
      cancelled = true
      window.removeEventListener(POSITION_WRITE_EVENT, onPositionWrite)
      window.removeEventListener("online", onOnline)
    }
  }, [])

  return null
}
