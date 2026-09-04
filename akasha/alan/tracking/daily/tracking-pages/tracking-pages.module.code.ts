import { dataError } from "@tools/lib/exit"
import { askComposed } from "@tools/lib/page-query-client"
import type { Page } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"

export type PageAccessClient = unknown

const HELD_SEQ = 0

export function getPageAccessClient(): PageAccessClient {
  return null
}

export function pageOf(values: Readonly<Record<string, unknown>>): Page {
  const camel: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) camel[camelizeKey(key)] = value
  const id = camel.id
  return { ...camel, id: typeof id === "string" ? id : "", seq: HELD_SEQ } as Page
}

export interface Condition {
  readonly key: string
  readonly eq: string
}

export interface PagesQuery {
  readonly pageTypeSlug: string
  readonly where?: readonly Condition[]
  readonly select?: readonly string[]
  readonly limit?: number
  readonly sortBy?: string
  readonly descending?: boolean
}

function composedFrom(query: PagesQuery): Record<string, unknown> {
  const where: Record<string, unknown> = {}
  for (const one of query.where ?? []) where[one.key] = { is: one.eq }
  return {
    "page-type": query.pageTypeSlug,
    ...(query.where === undefined || query.where.length === 0 ? {} : { where }),
    ...(query.select === undefined ? {} : { keys: query.select }),
    ...(query.limit === undefined ? {} : { limit: query.limit }),
    ...(query.sortBy === undefined ? {} : { "sort-by": query.sortBy }),
    ...(query.descending === true ? { descending: true } : {}),
  }
}

export async function getPages(
  _sb: PageAccessClient,
  query: PagesQuery
): Promise<{ readonly rows: readonly Page[]; readonly count: number }> {
  const asked = await askComposed(composedFrom(query))
  if (!asked.ok) {
    throw dataError(`reading ${query.pageTypeSlug} pages: ${asked.why}`)
  }
  return { rows: asked.rows.map((row) => pageOf(row.values)), count: asked.n }
}

export async function getPage(_sb: PageAccessClient, query: PagesQuery): Promise<Page | null> {
  const { rows } = await getPages(_sb, { ...query, limit: query.limit ?? 1 })
  return rows[0] ?? null
}
