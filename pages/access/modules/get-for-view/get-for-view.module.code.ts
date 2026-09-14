import type { PageCursor, PageOrder } from "akasha/pages/access/modules/types/types.module.code.ts"
import type {
  Page,
  PageWhere,
} from "akasha/pages/core/modules/page-types/page-types.module.code.ts"

export type GetPagesForViewArgs = {
  pageTypeId: string
  pageTypeSlug?: string
  filters?: PageWhere
  sorts?: PageOrder
  cursor?: PageCursor
  limit?: number
  resolveKeys?: readonly string[]
  withCount?: boolean
  select?: readonly string[]
}

export type GetPagesForViewResult = {
  rows: readonly Page[]
  nextCursor: PageCursor | null
  count: number | null
}
