import type { Page, PageCondition } from "@akasha/pages-core/page-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { JsonSchema } from "@akasha/utils-narrow/json-schema"
import { z } from "zod"
import {
  type CreatePageIfAbsentResult,
  createPage,
  createPageIfAbsent,
} from "../create/create.module.code.ts"
import {
  deletePage,
  deletePageById,
  deletePageByIds,
  deletePages,
} from "../deleting/deleting.module.code.ts"
import {
  isWriteOverServerOp,
  type WriteOverServerOp,
} from "../over-server/over-server.module.code.ts"
import { patchPage, patchPageById, patchPages } from "../patch/patch.module.code.ts"
import { bulkUpsertPages, upsertPage, upsertPages } from "../upsert/upsert.module.code.ts"

export type PageWriteAsked = {
  readonly op: WriteOverServerOp
  readonly args: Record<string, unknown>
}

export const TAKES =
  "a page write takes a JSON body naming an `op` this route runs and the `args` that op takes"

const PAGE_WRITE_ASKED = z.object({
  op: z.custom<WriteOverServerOp>(isWriteOverServerOp),
  args: z.looseObject({ pageTypeSlug: z.string().min(1) }),
})

export function readPageWrite(body: unknown): PageWriteAsked | null {
  const read = PAGE_WRITE_ASKED.safeParse(body)
  if (!read.success) return null
  return { op: read.data.op, args: read.data.args }
}

export function writesAs(app: string): undefined {
  const stated = z.string().optional().parse(process.env.PAGE_WRITER)
  if (stated === undefined) process.env.PAGE_WRITER = app
}

const PAGE_CONDITION: z.ZodType<PageCondition> = z.lazy(() =>
  z.union([
    z.object({ key: z.string(), eq: JsonSchema }),
    z.object({ key: z.string(), neq: JsonSchema }),
    z.object({ key: z.string(), lt: JsonSchema }),
    z.object({ key: z.string(), gt: JsonSchema }),
    z.object({ key: z.string(), lte: JsonSchema }),
    z.object({ key: z.string(), gte: JsonSchema }),
    z.object({ key: z.string(), isNull: z.literal(true) }),
    z.object({ key: z.string(), in: z.array(JsonSchema) }),
    z.object({ key: z.string(), notIn: z.array(JsonSchema) }),
    z.object({ key: z.string(), contains: z.string() }),
    z.object({ key: z.string(), notContains: z.string() }),
    z.object({ key: z.string(), includes: JsonSchema }),
    z.object({ key: z.string(), isEmpty: z.literal(true) }),
    z.object({ key: z.string(), isNotEmpty: z.literal(true) }),
    z.object({ or: z.array(PAGE_CONDITION) }),
  ])
)

const PAGE_WHERE = z.array(PAGE_CONDITION)
const PAGE_PROPERTIES = z.record(z.string(), JsonSchema)
const PAGE_SELECT = z.array(z.string()).optional()
const PIPELINE_SCOPE = z.union([z.number(), z.string()]).optional()
const PAGE_TYPE_SLUG = z.string().min(1)

const JSON_PATCH = z.array(
  z.union([
    z.object({ op: z.literal("replace"), path: z.string(), value: JsonSchema }),
    z.object({ op: z.literal("add"), path: z.string(), value: JsonSchema }),
    z.object({ op: z.literal("remove"), path: z.string() }),
  ])
)

const CREATE_PAGE_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  properties: PAGE_PROPERTIES,
  select: PAGE_SELECT,
  pipelineScope: PIPELINE_SCOPE,
  id: z.string().optional(),
})

const CREATE_PAGE_IF_ABSENT_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  where: PAGE_WHERE,
  properties: PAGE_PROPERTIES,
  select: PAGE_SELECT,
  pipelineScope: PIPELINE_SCOPE,
})

const PATCH_PAGE_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  where: PAGE_WHERE,
  set: PAGE_PROPERTIES,
  patch: JSON_PATCH.optional(),
  select: PAGE_SELECT,
  pipelineScope: PIPELINE_SCOPE,
})

const UPSERT_PAGE_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  where: PAGE_WHERE,
  set: PAGE_PROPERTIES,
  select: PAGE_SELECT,
  pipelineScope: PIPELINE_SCOPE,
})

const UPSERT_PAGES_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  items: z.array(z.object({ where: PAGE_WHERE, set: PAGE_PROPERTIES })),
  select: PAGE_SELECT,
  pipelineScope: PIPELINE_SCOPE,
})

const PATCH_PAGE_BY_ID_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  id: z.string().min(1),
  set: PAGE_PROPERTIES,
  patch: JSON_PATCH.optional(),
  select: PAGE_SELECT,
  pipelineScope: PIPELINE_SCOPE,
})

const DELETE_PAGE_BY_ID_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  id: z.string().min(1),
  select: PAGE_SELECT,
})

const DELETE_PAGE_BY_IDS_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  ids: z.array(z.string().min(1)),
  select: PAGE_SELECT,
})

const BULK_UPSERT_PAGES_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  uniqueAttributeKey: z.string().min(1),
  items: z.array(PAGE_PROPERTIES),
  select: PAGE_SELECT,
  pipelineScope: PIPELINE_SCOPE,
})

const DELETE_PAGE_ARGS = z.object({
  pageTypeSlug: PAGE_TYPE_SLUG,
  where: PAGE_WHERE,
  select: PAGE_SELECT,
})

export type PageWriteAnswer = Page | readonly Page[] | CreatePageIfAbsentResult | null

export async function runPageWrite(asked: PageWriteAsked): Promise<PageWriteAnswer> {
  const { op, args } = asked
  switch (op) {
    case "createPage":
      return createPage(CREATE_PAGE_ARGS.parse(args))
    case "createPageIfAbsent":
      return createPageIfAbsent(CREATE_PAGE_IF_ABSENT_ARGS.parse(args))
    case "patchPage":
      return patchPage(PATCH_PAGE_ARGS.parse(args))
    case "patchPages":
      return patchPages(PATCH_PAGE_ARGS.parse(args))
    case "patchPageById":
      return patchPageById(PATCH_PAGE_BY_ID_ARGS.parse(args))
    case "upsertPage":
      return upsertPage(UPSERT_PAGE_ARGS.parse(args))
    case "upsertPages":
      return upsertPages(UPSERT_PAGES_ARGS.parse(args))
    case "deletePage":
      return deletePage(DELETE_PAGE_ARGS.parse(args))
    case "deletePages":
      return deletePages(DELETE_PAGE_ARGS.parse(args))
    case "deletePageById":
      return deletePageById(DELETE_PAGE_BY_ID_ARGS.parse(args))
    case "deletePageByIds":
      return deletePageByIds(DELETE_PAGE_BY_IDS_ARGS.parse(args))
    case "bulkUpsertPages":
      return bulkUpsertPages(BULK_UPSERT_PAGES_ARGS.parse(args))
    default:
      return assertNever(op)
  }
}
