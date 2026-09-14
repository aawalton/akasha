import { getFilesystem } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import {
  readDocumentsFile,
  writeDocumentsFile,
} from "akasha/alan/web/modules/offline-cache-fs/offline-cache-fs.module.code.ts"
import {
  type CompletionQueue,
  CompletionQueuePersistedSchema,
  EMPTY_COMPLETION_QUEUE,
  EMPTY_POSITION_STORE,
  enqueueCompletion,
  migrateCompletionQueue,
  migratePositionStore,
  type PositionStore,
  PositionStorePersistedSchema,
  setLocalPosition,
} from "akasha/alan/web/modules/offline-text-cache/offline-text-cache.module.code.ts"
import { reportReadCompletionDiag } from "akasha/alan/web/modules/read-completion-diagnostics/read-completion-diagnostics.module.code.ts"
import { saidBy } from "akasha/utils/narrow/modules/said-by/said-by.module.code.ts"

const COMPLETION_QUEUE_PATH = "completion-queue.json"
const POSITION_STORE_PATH = "position-store.json"

async function readCompletionQueue(): Promise<CompletionQueue> {
  const raw = await readDocumentsFile(COMPLETION_QUEUE_PATH)
  if (raw == null) return EMPTY_COMPLETION_QUEUE
  try {
    const parsed = CompletionQueuePersistedSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) return EMPTY_COMPLETION_QUEUE
    return migrateCompletionQueue(parsed.data)
  } catch {
    return EMPTY_COMPLETION_QUEUE
  }
}

async function writeCompletionQueue(queue: CompletionQueue): Promise<void> {
  await writeDocumentsFile(COMPLETION_QUEUE_PATH, JSON.stringify(queue))
}

async function readPositionStore(): Promise<PositionStore> {
  const raw = await readDocumentsFile(POSITION_STORE_PATH)
  if (raw == null) return EMPTY_POSITION_STORE
  try {
    const parsed = PositionStorePersistedSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) return EMPTY_POSITION_STORE
    return migratePositionStore(parsed.data)
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
    if (native) reportReadCompletionDiag("enqueue-failed", saidBy(error))
  }
}
