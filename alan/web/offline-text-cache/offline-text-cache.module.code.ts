import { z } from "zod"

export const CachedChapterSchema = z
  .object({
    pageId: z.string(),
    storyId: z.string(),
    chapterNumber: z.number().nullable(),
    title: z.string(),
    length: z.number().nullable(),
    fileName: z.string(),
    cachedAt: z.string(),
    completedLocally: z.string().nullable(),
  })
  .strict()

export const CacheIndexSchema = z
  .object({
    version: z.literal(2),
    chapters: z.array(CachedChapterSchema),
  })
  .strict()

export type CachedChapter = z.infer<typeof CachedChapterSchema>
export type CacheIndex = z.infer<typeof CacheIndexSchema>

export const EMPTY_CACHE_INDEX: CacheIndex = { version: 2, chapters: [] }

const CachedChapterV1Schema = CachedChapterSchema.omit({ length: true })
  .extend({ wordCount: z.number().nullable() })
  .strict()

const CacheIndexV1Schema = z
  .object({ version: z.literal(1), chapters: z.array(CachedChapterV1Schema) })
  .strict()

export const CacheIndexPersistedSchema = z.discriminatedUnion("version", [
  CacheIndexV1Schema,
  CacheIndexSchema,
])

export function migrateCacheIndex(parsed: z.infer<typeof CacheIndexPersistedSchema>): CacheIndex {
  if (parsed.version === 2) return parsed
  return {
    version: 2,
    chapters: parsed.chapters.map(({ wordCount, ...rest }) => ({ ...rest, length: wordCount })),
  }
}

function chapterLengths(index: CacheIndex): Map<string, number> {
  const lengths = new Map<string, number>()
  for (const chapter of index.chapters) {
    if (chapter.length !== null) lengths.set(chapter.pageId, chapter.length)
  }
  return lengths
}

export const QueuedCompletionSchema = z
  .object({
    pageId: z.string(),
    completedAt: z.string(),
    length: z.number(),
    queuedAt: z.string(),
  })
  .strict()

export const CompletionQueueSchema = z
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
  parsed: z.infer<typeof CompletionQueuePersistedSchema>,
  index: CacheIndex
): CompletionQueue {
  if (parsed.version === 2) return parsed
  const lengths = chapterLengths(index)
  const entries: QueuedCompletion[] = []
  for (const entry of parsed.entries) {
    const length = lengths.get(entry.pageId)
    if (length === undefined) continue
    entries.push({ ...entry, length })
  }
  return { version: 2, entries }
}

export function upsertCachedChapter(index: CacheIndex, chapter: CachedChapter): CacheIndex {
  const existing = index.chapters.find((c) => c.pageId === chapter.pageId)
  const merged: CachedChapter =
    existing !== undefined && chapter.completedLocally === null
      ? { ...chapter, completedLocally: existing.completedLocally }
      : chapter
  const chapters = index.chapters.filter((c) => c.pageId !== chapter.pageId)
  chapters.push(merged)
  return { version: 2, chapters }
}

export function markChapterCompletedLocally(
  index: CacheIndex,
  pageId: string,
  completedAt: string
): CacheIndex {
  const chapters = index.chapters.map((c) =>
    c.pageId === pageId ? { ...c, completedLocally: completedAt } : c
  )
  return { version: 2, chapters }
}

export interface OfflineChapterListItem {
  readonly pageId: string
  readonly chapterNumber: number | null
  readonly title: string
  readonly completed: boolean
}

export function offlineReadingList(index: CacheIndex): readonly OfflineChapterListItem[] {
  return [...index.chapters]
    .sort((a, b) => {
      const an = a.chapterNumber ?? Number.POSITIVE_INFINITY
      const bn = b.chapterNumber ?? Number.POSITIVE_INFINITY
      if (an !== bn) return an - bn
      return a.title.localeCompare(b.title)
    })
    .map((c) => ({
      pageId: c.pageId,
      chapterNumber: c.chapterNumber,
      title: c.title,
      completed: c.completedLocally != null,
    }))
}

export function enqueueCompletion(
  queue: CompletionQueue,
  entry: QueuedCompletion
): CompletionQueue {
  const entries = queue.entries.filter((e) => e.pageId !== entry.pageId)
  entries.push(entry)
  return { version: 2, entries }
}

export function completionPatches(
  queue: CompletionQueue
): readonly { pageId: string; completedAt: string; length: number }[] {
  return queue.entries.map((e) => ({
    pageId: e.pageId,
    completedAt: e.completedAt,
    length: e.length,
  }))
}

export function removeQueuedCompletions(
  queue: CompletionQueue,
  syncedPageIds: readonly string[]
): CompletionQueue {
  const synced = new Set(syncedPageIds)
  return { version: 2, entries: queue.entries.filter((e) => !synced.has(e.pageId)) }
}

export const QueuedPositionSchema = z
  .object({
    pageId: z.string(),
    progress: z.number(),
    updatedAt: z.string(),
  })
  .strict()

export const PositionStoreSchema = z
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
  parsed: z.infer<typeof PositionStorePersistedSchema>,
  index: CacheIndex
): PositionStore {
  if (parsed.version === 2) return parsed
  const lengths = chapterLengths(index)
  return {
    version: 2,
    entries: parsed.entries.map(({ fraction, ...rest }) => {
      const length = lengths.get(rest.pageId)
      const progress = length === undefined ? fraction : Math.round(fraction * length)
      return { ...rest, progress }
    }),
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

export function positionPatches(
  store: PositionStore
): readonly { pageId: string; progress: number; updatedAt: string }[] {
  return store.entries.map((e) => ({
    pageId: e.pageId,
    progress: e.progress,
    updatedAt: e.updatedAt,
  }))
}

export function removeSyncedPositions(
  store: PositionStore,
  synced: readonly { pageId: string; updatedAt: string }[]
): PositionStore {
  const syncedStamp = new Map(synced.map((s) => [s.pageId, s.updatedAt]))
  return {
    version: 2,
    entries: store.entries.filter((e) => syncedStamp.get(e.pageId) !== e.updatedAt),
  }
}

export function chunk<T>(items: readonly T[], size: number): readonly (readonly T[])[] {
  const step = Math.max(1, Math.floor(size))
  const batches: T[][] = []
  for (let i = 0; i < items.length; i += step) {
    batches.push(items.slice(i, i + step))
  }
  return batches
}

export const OFFLINE_COMPLETIONS_CHANGED_EVENT = "offline-completions-changed"
