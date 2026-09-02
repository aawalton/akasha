import type { Page, PageWhere } from "@akasha/pages-core/page-types"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { FileReadShape } from "../file-read/file-read.module.code.ts"
import {
  getFilePage,
  getFilePageByIdSuffix,
  getFilePages,
  getFilePagesByIdSuffix,
  isFileBacked,
  pickOne,
} from "../file-read/file-read.module.code.ts"
import { fileShapeOf } from "../file-shape/file-shape.module.code.ts"
import { applySelect } from "../routing-core/routing-core.module.code.ts"
import type { PageCursor, PageOrder, PageSelect } from "../types/types.module.code.ts"

const ID_SUFFIX_PATTERN = /^[0-9a-f]{8}$/

export type GetPageArgs = {
  pageTypeSlug: string
  where: PageWhere
  select?: PageSelect
}

export function unfiledWhy(op: string, pageTypeSlug: string): string {
  return `${op}(${pageTypeSlug}): that page type is not file-backed, and pages are no longer read from a table. Give the \`${pageTypeSlug}\` page type a \`files:\` glob, or ask for a page type that has one.`
}

export async function getPage(args: GetPageArgs): Promise<Page | null> {
  if (args.pageTypeSlug == null) {
    throw new Error("getPage: pageTypeSlug is required, because a page is read from its own files")
  }
  const shape = await requireFileShape(args.pageTypeSlug, "getPage")
  return getFilePage({
    pageTypeSlug: args.pageTypeSlug,
    shape,
    where: args.where,
    select: args.select,
  })
}

export type GetPageByIdSuffixArgs = {
  pageTypeSlug: PageTypeSlug
  idSuffix: string
  slug?: string
  select?: PageSelect
}

export async function getPageByIdSuffix(args: GetPageByIdSuffixArgs): Promise<Page | null> {
  if (!ID_SUFFIX_PATTERN.test(args.idSuffix)) {
    throw new Error(
      `getPageByIdSuffix: idSuffix must be 8 lowercase hex chars, got '${args.idSuffix}'`
    )
  }
  const shape = await requireFileShape(args.pageTypeSlug, "getPageByIdSuffix")
  return getFilePageByIdSuffix({
    pageTypeSlug: args.pageTypeSlug,
    shape,
    idSuffix: args.idSuffix,
    slug: args.slug,
    select: args.select,
  })
}

export type GetPageByIdSuffixAcrossTypesArgs = {
  pageTypeSlugs: readonly PageTypeSlug[]
  idSuffix: string
  slug?: string
  select?: PageSelect
}

export async function getPageByIdSuffixAcrossTypes(
  args: GetPageByIdSuffixAcrossTypesArgs
): Promise<Page | null> {
  if (!ID_SUFFIX_PATTERN.test(args.idSuffix)) {
    throw new Error(
      `getPageByIdSuffixAcrossTypes: idSuffix must be 8 lowercase hex chars, got '${args.idSuffix}'`
    )
  }
  if (args.pageTypeSlugs.length === 0) return null

  const found: Page[] = []
  for (const slug of args.pageTypeSlugs) {
    const shape = await requireFileShape(slug, "getPageByIdSuffixAcrossTypes")
    found.push(
      ...(await getFilePagesByIdSuffix({ pageTypeSlug: slug, shape, idSuffix: args.idSuffix }))
    )
  }

  const slugList = [...args.pageTypeSlugs].join(", ")
  const one = pickOne(found, args.slug, `page-types [${slugList}]`)
  return one === null ? null : applySelect(one, args.select)
}

export type GetPagesArgs = {
  pageTypeSlug: string
  where?: PageWhere
  select?: PageSelect
  order?: PageOrder
  limit?: number
  cursor?: PageCursor
  offset?: number
  withCount?: boolean
}

export type GetPagesResult = {
  rows: readonly Page[]
  nextCursor: PageCursor | null
  count: number | null
}

const DEFAULT_ORDER: PageOrder = [{ by: "seq", dir: "asc" }]
const DEFAULT_LIMIT = 1000

export type GetPagesQuery = Omit<GetPagesArgs, "pageTypeSlug"> & { pageTypeSlug?: string }

export function shapelessWhy(pageTypeSlug: string): string {
  return `${pageTypeSlug} is file-backed but nothing states its id, so its pages cannot be read. Give the \`${pageTypeSlug}\` page type an \`id:\`.`
}

async function fileShapeFor(pageTypeSlug: string): Promise<FileReadShape | null> {
  if (!(await isFileBacked(pageTypeSlug))) return null
  const shape = await fileShapeOf(pageTypeSlug)
  if (shape === null) throw new Error(shapelessWhy(pageTypeSlug))
  return shape
}

async function requireFileShape(pageTypeSlug: string, op: string): Promise<FileReadShape> {
  const shape = await fileShapeFor(pageTypeSlug)
  if (shape === null) throw new Error(unfiledWhy(op, pageTypeSlug))
  return shape
}

export async function getPages(args: GetPagesQuery): Promise<GetPagesResult> {
  if (args.offset != null && args.offset > 0 && args.cursor != null) {
    throw new Error("getPages: offset and cursor are two different pagings; pass one")
  }
  if (args.pageTypeSlug == null) {
    throw new Error(
      "getPages: pageTypeSlug is required, because pages are read from their own files"
    )
  }
  const shape = await requireFileShape(args.pageTypeSlug, "getPages")
  const got = await getFilePages({
    pageTypeSlug: args.pageTypeSlug,
    shape,
    where: args.where,
    select: args.select,
    order: args.order ?? DEFAULT_ORDER,
    limit: args.limit ?? DEFAULT_LIMIT,
    offset: args.offset,
    cursor: args.cursor,
    withCount: args.withCount,
  })
  return { rows: got.rows, nextCursor: got.nextCursor, count: got.count }
}
