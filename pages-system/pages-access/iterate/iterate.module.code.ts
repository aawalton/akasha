import type { Page } from "@akasha/pages-core/page-types"
import { type GetPagesArgs, getPages } from "../get/get.module.code.ts"
import type { PageCursor } from "../types/types.module.code.ts"

export type StreamPagesArgs = Omit<GetPagesArgs, "limit" | "cursor" | "pageTypeSlug"> & {
  pageTypeSlug?: string
  pageSize?: number
  max?: number
}

const DEFAULT_PAGE_SIZE = 24
const MIN_PAGE_SIZE = 1
const MAX_PAGE_SIZE = 2500

function clampPageSize(n: number | undefined): number {
  if (n === undefined) return DEFAULT_PAGE_SIZE
  if (!Number.isFinite(n)) return DEFAULT_PAGE_SIZE
  if (n < MIN_PAGE_SIZE) return MIN_PAGE_SIZE
  if (n > MAX_PAGE_SIZE) return MAX_PAGE_SIZE
  return Math.floor(n)
}

export async function* streamPages(args: StreamPagesArgs): AsyncIterable<Page> {
  const { pageSize: askedPageSize, max: askedMax, ...base } = args
  const pageSize = clampPageSize(askedPageSize)
  const max = askedMax

  let cursor: PageCursor | undefined
  let yielded = 0
  while (true) {
    const { rows, nextCursor } = await getPages({
      ...base,
      limit: pageSize,
      cursor,
    })
    for (const row of rows) {
      if (max !== undefined && yielded >= max) return
      yield row
      yielded++
    }
    if (max !== undefined && yielded >= max) return
    if (nextCursor == null) return
    cursor = nextCursor
  }
}

export async function collectPages(args: StreamPagesArgs): Promise<Page[]> {
  return Array.fromAsync(streamPages(args))
}
