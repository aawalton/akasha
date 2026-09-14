import { z } from "zod"

const QueuedCompletionSchema = z
  .object({
    pageId: z.string(),
    completedAt: z.string(),
    length: z.number(),
    queuedAt: z.string(),
  })
  .strict()

const CompletionQueueSchema = z
  .object({
    version: z.literal(2),
    entries: z.array(QueuedCompletionSchema),
  })
  .strict()

export type QueuedCompletion = z.infer<typeof QueuedCompletionSchema>
export type CompletionQueue = z.infer<typeof CompletionQueueSchema>

export const EMPTY_COMPLETION_QUEUE: CompletionQueue = { version: 2, entries: [] }

const QueuedCompletionV1Schema = QueuedCompletionSchema.omit({ length: true }).strict()

const CompletionQueueV1Schema = z
  .object({ version: z.literal(1), entries: z.array(QueuedCompletionV1Schema) })
  .strict()

export const CompletionQueuePersistedSchema = z.discriminatedUnion("version", [
  CompletionQueueV1Schema,
  CompletionQueueSchema,
])

export function migrateCompletionQueue(
  parsed: z.infer<typeof CompletionQueuePersistedSchema>
): CompletionQueue {
  if (parsed.version === 2) return parsed
  return { version: 2, entries: [] }
}

export function enqueueCompletion(
  queue: CompletionQueue,
  entry: QueuedCompletion
): CompletionQueue {
  const entries = queue.entries.filter((e) => e.pageId !== entry.pageId)
  entries.push(entry)
  return { version: 2, entries }
}

const QueuedPositionSchema = z
  .object({
    pageId: z.string(),
    progress: z.number(),
    updatedAt: z.string(),
  })
  .strict()

const PositionStoreSchema = z
  .object({
    version: z.literal(2),
    entries: z.array(QueuedPositionSchema),
  })
  .strict()

export type QueuedPosition = z.infer<typeof QueuedPositionSchema>
export type PositionStore = z.infer<typeof PositionStoreSchema>

export const EMPTY_POSITION_STORE: PositionStore = { version: 2, entries: [] }

const QueuedPositionV1Schema = QueuedPositionSchema.omit({ progress: true })
  .extend({ fraction: z.number() })
  .strict()

const PositionStoreV1Schema = z
  .object({ version: z.literal(1), entries: z.array(QueuedPositionV1Schema) })
  .strict()

export const PositionStorePersistedSchema = z.discriminatedUnion("version", [
  PositionStoreV1Schema,
  PositionStoreSchema,
])

export function migratePositionStore(
  parsed: z.infer<typeof PositionStorePersistedSchema>
): PositionStore {
  if (parsed.version === 2) return parsed
  return {
    version: 2,
    entries: parsed.entries.map(({ fraction, ...rest }) => ({ ...rest, progress: fraction })),
  }
}

export function setLocalPosition(store: PositionStore, entry: QueuedPosition): PositionStore {
  const entries = store.entries.filter((e) => e.pageId !== entry.pageId)
  entries.push(entry)
  return { version: 2, entries }
}

export function localPositionFor(store: PositionStore, pageId: string): number | undefined {
  return store.entries.find((e) => e.pageId === pageId)?.progress
}

export function chunk<T>(items: readonly T[], size: number): readonly (readonly T[])[] {
  const step = Math.max(1, Math.floor(size))
  const batches: T[][] = []
  for (let i = 0; i < items.length; i += step) {
    batches.push(items.slice(i, i + step))
  }
  return batches
}
