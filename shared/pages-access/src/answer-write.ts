import { assertNever } from "../../utils-narrow/src/assert-never"
import { JsonSchema } from "../../utils-narrow/src/json-schema"
import { z } from "zod"
import { type CreatePageIfAbsentResult, createPage, createPageIfAbsent } from "./create"
import { hardDeletePage, hardDeletePages, softDeletePage, softDeletePages } from "./delete"
import { isWriteOverServerOp, type WriteOverServerOp } from "./over-server"
import { patchPage, patchPages } from "./patch"
import type { Page, PageCondition } from "@shared/pages-core/page-types"
import { upsertPage, upsertPages } from "./upsert"

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
    case "upsertPage":
      return upsertPage(UPSERT_PAGE_ARGS.parse(args))
    case "upsertPages":
      return upsertPages(UPSERT_PAGES_ARGS.parse(args))
    case "softDeletePage":
      return softDeletePage(DELETE_PAGE_ARGS.parse(args))
    case "softDeletePages":
      return softDeletePages(DELETE_PAGE_ARGS.parse(args))
    case "hardDeletePage":
      return hardDeletePage(DELETE_PAGE_ARGS.parse(args))
    case "hardDeletePages":
      return hardDeletePages(DELETE_PAGE_ARGS.parse(args))
    default:
      return assertNever(op)
  }
}
