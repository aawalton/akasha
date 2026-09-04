import type { Page, PageWhere } from "@akasha/pages-core/page-types"
import {
  type FileReadDeps,
  getFilePages,
  isFileBacked,
} from "../file-read/file-read.module.code.ts"
import { fileShapeOf, pageTypeSlugById } from "../file-shape/file-shape.module.code.ts"
import { shapelessWhy, unfiledWhy } from "../get/get.module.code.ts"
import type { PageCursor, PageOrder } from "../types/types.module.code.ts"

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

const DEFAULT_LIMIT = 24

async function viewPageTypeSlug(
  args: GetPagesForViewArgs,
  deps: FileReadDeps | undefined
): Promise<string | null> {
  if (args.pageTypeSlug != null && args.pageTypeSlug !== "") return args.pageTypeSlug
  return pageTypeSlugById(args.pageTypeId, deps)
}

export async function getPagesForView(
  args: GetPagesForViewArgs,
  deps?: FileReadDeps
): Promise<GetPagesForViewResult> {
  const limit = args.limit ?? DEFAULT_LIMIT

  const pageTypeSlug = await viewPageTypeSlug(args, deps)
  if (pageTypeSlug === null) {
    throw new Error(
      `getPagesForView(${args.pageTypeId}): no page type stands under that id, so this view has nothing to read. A view names its page type by uuid; give it a page type whose file states that id.`
    )
  }
  if (!(await isFileBacked(pageTypeSlug))) {
    throw new Error(unfiledWhy("getPagesForView", pageTypeSlug))
  }
  const shape = await fileShapeOf(pageTypeSlug)
  if (shape === null) throw new Error(shapelessWhy(pageTypeSlug))

  const asked = {
    pageTypeSlug,
    shape,
    where: args.filters,
    order: args.sorts,
    limit,
    cursor: args.cursor,
    withCount: args.withCount,
    ...(args.select === undefined ? {} : { select: args.select }),
  }
  const got = deps === undefined ? await getFilePages(asked) : await getFilePages(asked, deps)
  return { rows: got.rows, nextCursor: got.nextCursor, count: got.count }
}
