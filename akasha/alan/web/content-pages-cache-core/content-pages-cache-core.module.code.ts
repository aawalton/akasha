import { asPage, type Page } from "@akasha/pages-core/page-types"
import { z } from "zod"

export const ContentPageIndexSchema = z
  .object({
    version: z.literal(1),
    ids: z.array(z.string()),
    pinnedIds: z.array(z.string()).default([]),
    recency: z.array(z.string()).default([]),
  })
  .strict()

export type ContentPageIndex = z.infer<typeof ContentPageIndexSchema>

export const EMPTY_CONTENT_PAGE_INDEX: ContentPageIndex = {
  version: 1,
  ids: [],
  pinnedIds: [],
  recency: [],
}

export const MAX_UNPINNED_CACHED_BODIES = 200

export const PersistedContentPageSchema = z
  .object({
    id: z.string(),
    seq: z.number().nullable(),
    title: z.string().nullable(),
    icon: z.string().nullable(),
    slug: z.string().nullable(),
    userId: z.string(),
    pageTypeId: z.string(),
    pageTypeSlug: z.string(),
    uniqueKey: z.string().nullable(),
    parentKey: z.string().nullable(),
  })
  .passthrough()

export function parseContentPageIndex(raw: string): ContentPageIndex {
  try {
    const parsed = ContentPageIndexSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : EMPTY_CONTENT_PAGE_INDEX
  } catch {
    return EMPTY_CONTENT_PAGE_INDEX
  }
}

export function parsePersistedContentPage(raw: string): Page | null {
  try {
    const parsed = PersistedContentPageSchema.safeParse(JSON.parse(raw))
    return parsed.success ? asPage(parsed.data) : null
  } catch {
    return null
  }
}

export function serializeContentPageIndex(index: ContentPageIndex): string {
  return JSON.stringify(index)
}

export function serializeContentPage(page: Page): string {
  return JSON.stringify(page)
}

export function mergeContentPage(existing: Page | null, next: Page): Page {
  if (existing === null) return next
  return asPage({ ...existing, ...next })
}

export function addContentPageIds(
  index: ContentPageIndex,
  ids: readonly string[]
): ContentPageIndex {
  const seen = new Set(index.ids)
  const appended = ids.filter((id) => !seen.has(id))
  if (appended.length === 0) return index
  return {
    version: 1,
    ids: [...index.ids, ...appended],
    pinnedIds: index.pinnedIds,
    recency: index.recency,
  }
}

export function addPinnedIds(index: ContentPageIndex, ids: readonly string[]): ContentPageIndex {
  const seen = new Set(index.pinnedIds)
  const appended = ids.filter((id) => !seen.has(id))
  if (appended.length === 0) return index
  return {
    version: 1,
    ids: index.ids,
    pinnedIds: [...index.pinnedIds, ...appended],
    recency: index.recency,
  }
}

export function touchRecency(index: ContentPageIndex, ids: readonly string[]): ContentPageIndex {
  const cached = new Set(index.ids)
  const touched = ids.filter((id) => cached.has(id))
  if (touched.length === 0) return index
  const touchedSet = new Set(touched)
  const kept = index.recency.filter((id) => !touchedSet.has(id))
  const movedToEnd: string[] = []
  const movedSeen = new Set<string>()
  for (const id of touched) {
    if (movedSeen.has(id)) continue
    movedSeen.add(id)
    movedToEnd.push(id)
  }
  const nextRecency = [...kept, ...movedToEnd]
  if (
    nextRecency.length === index.recency.length &&
    nextRecency.every((id, i) => id === index.recency[i])
  ) {
    return index
  }
  return { version: 1, ids: index.ids, pinnedIds: index.pinnedIds, recency: nextRecency }
}

export function computeEvictableIds(index: ContentPageIndex, max: number): readonly string[] {
  const pinned = new Set(index.pinnedIds)
  const unpinned = index.ids.filter((id) => !pinned.has(id))
  const overBy = unpinned.length - max
  if (overBy <= 0) return []
  const recencyRank = new Map<string, number>()
  index.recency.forEach((id, i) => recencyRank.set(id, i))
  const oldestFirst = [...unpinned].sort((a, b) => {
    const ra = recencyRank.get(a)
    const rb = recencyRank.get(b)
    if (ra === undefined && rb === undefined) return 0
    if (ra === undefined) return -1
    if (rb === undefined) return 1
    return ra - rb
  })
  return oldestFirst.slice(0, overBy)
}

export function removeContentPageIds(
  index: ContentPageIndex,
  ids: readonly string[]
): ContentPageIndex {
  if (ids.length === 0) return index
  const remove = new Set(ids)
  const nextIds = index.ids.filter((id) => !remove.has(id))
  if (nextIds.length === index.ids.length) return index
  const nextRecency = index.recency.filter((id) => !remove.has(id))
  return { version: 1, ids: nextIds, pinnedIds: index.pinnedIds, recency: nextRecency }
}
