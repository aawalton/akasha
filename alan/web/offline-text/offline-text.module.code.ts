import { getFilesystem } from "akasha/alan/web/capacitor-bridge/capacitor-bridge.module.code.ts"
import {
  readDocumentsFile,
  writeDocumentsFile,
} from "akasha/alan/web/offline-cache-fs/offline-cache-fs.module.code.ts"
import {
  CacheIndexPersistedSchema,
  type CompletionQueue,
  CompletionQueuePersistedSchema,
  EMPTY_CACHE_INDEX,
  EMPTY_COMPLETION_QUEUE,
  EMPTY_POSITION_STORE,
  enqueueCompletion,
  migrateCacheIndex,
  migrateCompletionQueue,
  migratePositionStore,
  OFFLINE_COMPLETIONS_CHANGED_EVENT,
  type PositionStore,
  PositionStorePersistedSchema,
  removeQueuedCompletions,
  removeSyncedPositions,
  setLocalPosition,
} from "akasha/alan/web/offline-text-cache/offline-text-cache.module.code.ts"
import {
  describeThrown,
  reportReadCompletionDiag,
} from "akasha/alan/web/read-completion-diagnostics/read-completion-diagnostics.module.code.ts"

const CACHE_INDEX_PATH = "chapters-cache.json"
const COMPLETION_QUEUE_PATH = "completion-queue.json"
const POSITION_STORE_PATH = "position-store.json"

async function readCacheIndex() {
  const raw = await readDocumentsFile(CACHE_INDEX_PATH)
  if (raw == null) return EMPTY_CACHE_INDEX
  try {
    const parsed = CacheIndexPersistedSchema.safeParse(JSON.parse(raw))
    return parsed.success ? migrateCacheIndex(parsed.data) : EMPTY_CACHE_INDEX
  } catch {
    return EMPTY_CACHE_INDEX
  }
}

export async function readCompletionQueue(): Promise<CompletionQueue> {
  const raw = await readDocumentsFile(COMPLETION_QUEUE_PATH)
  if (raw == null) return EMPTY_COMPLETION_QUEUE
  try {
    const parsed = CompletionQueuePersistedSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) return EMPTY_COMPLETION_QUEUE
    return migrateCompletionQueue(parsed.data, await readCacheIndex())
  } catch {
    return EMPTY_COMPLETION_QUEUE
  }
}

async function writeCompletionQueue(queue: CompletionQueue): Promise<void> {
  await writeDocumentsFile(COMPLETION_QUEUE_PATH, JSON.stringify(queue))
}

export async function readPositionStore(): Promise<PositionStore> {
  const raw = await readDocumentsFile(POSITION_STORE_PATH)
  if (raw == null) return EMPTY_POSITION_STORE
  try {
    const parsed = PositionStorePersistedSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) return EMPTY_POSITION_STORE
    return migratePositionStore(parsed.data, await readCacheIndex())
  } catch {
    return EMPTY_POSITION_STORE
  }
}

async function writePositionStore(store: PositionStore): Promise<void> {
  await writeDocumentsFile(POSITION_STORE_PATH, JSON.stringify(store))
}

export async function writeLocalPosition(pageId: string, progress: number): Promise<void> {
  const store = await readPositionStore()
  const updatedAt = new Date().toISOString()
  await writePositionStore(setLocalPosition(store, { pageId, progress, updatedAt }))
}

export async function readLocalPosition(pageId: string): Promise<number | undefined> {
  const store = await readPositionStore()
  return store.entries.find((e) => e.pageId === pageId)?.progress
}

export async function clearSyncedPositions(
  synced: readonly { pageId: string; updatedAt: string }[]
): Promise<void> {
  if (synced.length === 0) return
  const store = await readPositionStore()
  await writePositionStore(removeSyncedPositions(store, synced))
}

export async function enqueueChapterCompletion(
  pageId: string,
  completedAt: string,
  length: number
): Promise<void> {
  const native = getFilesystem() != null
  try {
    const queue = await readCompletionQueue()
    const queuedAt = new Date().toISOString()
    await writeCompletionQueue(enqueueCompletion(queue, { pageId, completedAt, length, queuedAt }))
    if (native) reportReadCompletionDiag("enqueued", `pageId=${pageId.slice(0, 8)}`)
  } catch (error: unknown) {
    if (native) reportReadCompletionDiag("enqueue-failed", describeThrown(error))
    return
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OFFLINE_COMPLETIONS_CHANGED_EVENT))
  }
}

export async function clearSyncedCompletions(syncedPageIds: readonly string[]): Promise<void> {
  if (syncedPageIds.length === 0) return
  const queue = await readCompletionQueue()
  await writeCompletionQueue(removeQueuedCompletions(queue, syncedPageIds))
}
