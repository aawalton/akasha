import { getDescendantPageTypeSlugs, getPages, PageTypeSlug } from "../../code/packages/shared/pages/access/src/index.ts"
import { z } from "../../code/node_modules/zod/index.js"
import type { StatusBarAccessClient } from "../../code/packages/shared/status-bar-access/src/client.ts"
import { READOUT_SCALE_PAGE_TYPE_SLUG, type ReadoutScale } from "./readout-scale-shape.ts"

const READOUT_PAGE_TYPE_SLUG = "readout"
const READOUT_SOURCE_PAGE_TYPE_SLUG = "readout-source"
export const READOUT_GROUP_PAGE_TYPE_SLUG = "readout-group"
export const PAGE_QUERY_PAGE_TYPE_SLUG = "page-query"

const MAX_ROWS = 1000

export type ReadoutSortOrder = "label" | "place"

const SORT_ORDER_UNSTATED: ReadoutSortOrder = "label"

const CATALOG_TTL_MS = 60_000

export interface ReadoutSourceAsking {
  readonly querySlug: string | null
  readonly keyArgument: string | null
}

export interface ReadoutQuery {
  readonly slug: string
  readonly takes: Readonly<Record<string, string>>
  readonly reducesToOneNumber: boolean
}

const ReadoutRowSchema = z
  .object({
    slug: z.string(),
    title: z.string().nullish(),
    label: z.string().nullish(),
    unit: z.string().nullish(),
    place: z.number().nullish(),
    scaleSlug: z.string().nullish(),
    sourceSlug: z.string().nullish(),
    sourceKey: z.string().nullish(),
    earnedKey: z.string().nullish(),
    wireKey: z.string().nullish(),
    groupSlugs: z.array(z.string()).nullish(),
  })
  .passthrough()

export type ReadoutRow = z.infer<typeof ReadoutRowSchema>

const ReadoutGroupRowSchema = z
  .object({
    slug: z.string(),
    sortOrder: z.enum(["label", "place"]).nullish(),
  })
  .passthrough()

const ReadoutScaleRowSchema = z
  .object({
    slug: z.string(),
    blackAt: z.number().nullish(),
    redAt: z.number().nullish(),
    orangeAt: z.number().nullish(),
    yellowAt: z.number().nullish(),
    greenAt: z.number().nullish(),
    blueAt: z.number().nullish(),
    earnedColourSlug: z.string().nullish(),
  })
  .passthrough()

const ReadoutSourceRowSchema = z
  .object({
    slug: z.string(),
    querySlug: z.string().nullish(),
    keyArgument: z.string().nullish(),
  })
  .passthrough()

const PageQueryRowSchema = z
  .object({
    slug: z.string(),
    takes: z.record(z.string(), z.string()).nullish(),
    function: z.string().nullish(),
  })
  .passthrough()

export interface ReadoutRows {
  readonly readouts: ReadonlyMap<string, ReadoutRow>
  readonly unreadableReadouts: ReadonlyMap<string, string>
}

export interface ReadoutCatalog extends ReadoutRows {
  readonly groups: ReadonlyMap<string, ReadoutSortOrder>
  readonly scales: ReadonlyMap<string, ReadoutScale>
  readonly unreadableScales: ReadonlyMap<string, string>
  readonly sources: ReadonlyMap<string, ReadoutSourceAsking>
  readonly queries: ReadonlyMap<string, ReadoutQuery>
  readonly readoutTypeSlugs: readonly string[]
}

export function readoutsIn(rows: readonly unknown[]): ReadoutRows {
  const readouts = new Map<string, ReadoutRow>()
  const unreadableReadouts = new Map<string, string>()
  for (const row of rows) {
    const parsed = ReadoutRowSchema.safeParse(row)
    if (!parsed.success) {
      const named = z.object({ slug: z.string() }).safeParse(row)
      if (named.success) unreadableReadouts.set(named.data.slug, parsed.error.message)
      continue
    }
    readouts.set(parsed.data.slug, parsed.data)
  }
  return { readouts, unreadableReadouts }
}

function scaleFrom(row: z.infer<typeof ReadoutScaleRowSchema>): ReadoutScale {
  return {
    slug: row.slug,
    blackAt: row.blackAt ?? undefined,
    redAt: row.redAt ?? undefined,
    orangeAt: row.orangeAt ?? undefined,
    yellowAt: row.yellowAt ?? undefined,
    greenAt: row.greenAt ?? undefined,
    blueAt: row.blueAt ?? undefined,
    earnedColourSlug: row.earnedColourSlug ?? undefined,
  }
}

async function readCatalog(sb: StatusBarAccessClient): Promise<ReadoutCatalog> {
  const readoutTypeSlugs = await getDescendantPageTypeSlugs(
    sb,
    PageTypeSlug(READOUT_PAGE_TYPE_SLUG)
  )
  const [readoutRowSets, scalePages, sourcePages, groupPages, queryPages] = await Promise.all([
    Promise.all(
      readoutTypeSlugs.map((slug) =>
        getPages(sb, { pageTypeSlug: slug, limit: MAX_ROWS }).then((got) => got.rows)
      )
    ),
    getPages(sb, { pageTypeSlug: READOUT_SCALE_PAGE_TYPE_SLUG, limit: MAX_ROWS }),
    getPages(sb, { pageTypeSlug: READOUT_SOURCE_PAGE_TYPE_SLUG, limit: MAX_ROWS }),
    getPages(sb, { pageTypeSlug: READOUT_GROUP_PAGE_TYPE_SLUG, limit: MAX_ROWS }),
    getPages(sb, { pageTypeSlug: PAGE_QUERY_PAGE_TYPE_SLUG, limit: MAX_ROWS }),
  ])
  const scales = new Map<string, ReadoutScale>()
  const unreadableScales = new Map<string, string>()
  for (const row of scalePages.rows) {
    const parsed = ReadoutScaleRowSchema.safeParse(row)
    if (!parsed.success) {
      const named = z.object({ slug: z.string() }).safeParse(row)
      if (named.success) unreadableScales.set(named.data.slug, parsed.error.message)
      continue
    }
    scales.set(parsed.data.slug, scaleFrom(parsed.data))
  }
  const sources = new Map<string, ReadoutSourceAsking>()
  for (const row of sourcePages.rows) {
    const parsed = ReadoutSourceRowSchema.safeParse(row)
    if (!parsed.success) continue
    sources.set(parsed.data.slug, {
      querySlug: parsed.data.querySlug ?? null,
      keyArgument: parsed.data.keyArgument ?? null,
    })
  }
  const groups = new Map<string, ReadoutSortOrder>()
  for (const row of groupPages.rows) {
    const parsed = ReadoutGroupRowSchema.safeParse(row)
    if (!parsed.success) continue
    groups.set(parsed.data.slug, parsed.data.sortOrder ?? SORT_ORDER_UNSTATED)
  }
  const queries = new Map<string, ReadoutQuery>()
  for (const row of queryPages.rows) {
    const parsed = PageQueryRowSchema.safeParse(row)
    if (!parsed.success) continue
    queries.set(parsed.data.slug, {
      slug: parsed.data.slug,
      takes: parsed.data.takes ?? {},
      reducesToOneNumber: (parsed.data.function ?? null) !== null,
    })
  }
  return {
    ...readoutsIn(readoutRowSets.flat()),
    groups,
    scales,
    unreadableScales,
    sources,
    queries,
    readoutTypeSlugs,
  }
}

let held: { readonly at: number; readonly catalog: Promise<ReadoutCatalog> } | null = null

export async function readoutCatalog(sb: StatusBarAccessClient): Promise<ReadoutCatalog> {
  const now = Date.now()
  const standing = held
  if (standing !== null && now - standing.at < CATALOG_TTL_MS) return standing.catalog
  const catalog = readCatalog(sb)
  held = { at: now, catalog }
  catalog.catch(() => {
    if (held?.catalog === catalog) held = null
  })
  return catalog
}
