import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { Json } from "@akasha/utils-narrow/json-value"

export type Page = {
  id: string
  seq: number | null
  title: string | null
  icon: string | null
  slug: string | null
  pageTypeId: string
  pageTypeSlug: PageTypeSlug
  uniqueKey: string | null
  [k: string]: Json
} & { readonly __brand: "Page" }

export function asPage(value: unknown): Page {
  return value as Page
}

export type PageCondition =
  | { key: string; eq: Json }
  | { key: string; neq: Json }
  | { key: string; lt: Json }
  | { key: string; gt: Json }
  | { key: string; lte: Json }
  | { key: string; gte: Json }
  | { key: string; isNull: true }
  | { key: string; in: readonly Json[] }
  | { key: string; notIn: readonly Json[] }
  | { key: string; contains: string }
  | { key: string; notContains: string }
  | { key: string; includes: Json }
  | { key: string; isEmpty: true }
  | { key: string; isNotEmpty: true }
  | { or: readonly PageCondition[] }

export type PageWhere = readonly PageCondition[]
