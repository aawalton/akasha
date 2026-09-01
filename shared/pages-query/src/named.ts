import type { ComposedQuery } from "@akasha/pages-query/ask"
import { bind, isRefused } from "../../../tools/lib/page-query-bind.ts"
import { namedQuery, type PageQuery, type Test } from "../../../tools/lib/page-query.ts"
import { here } from "./here.ts"

export type Given = Readonly<Record<string, string | readonly string[]>>

export type Standing =
  | { readonly where: "here" }
  | { readonly where: "there"; readonly query: ComposedQuery }
  | { readonly where: "refused"; readonly why: string }

function kebabed(name: string): string {
  return name.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

function testsBy(where: readonly Test[]): Readonly<Record<string, unknown>> {
  const held: Record<string, Record<string, unknown>> = {}
  for (const one of where) {
    const { key, ...rest } = one
    const named: Record<string, unknown> = {}
    for (const [test, bound] of Object.entries(rest)) named[kebabed(test)] = bound
    held[key] = { ...(held[key] ?? {}), ...named }
  }
  return held
}

export function composedOf(query: PageQuery): ComposedQuery {
  const where = query.where ?? []
  return {
    "page-type": query.pageType,
    ...(where.length === 0 ? {} : { where: testsBy(where) }),
    ...(query.countBy === undefined ? {} : { "count-by": query.countBy }),
    ...(query.keys === undefined ? {} : { keys: query.keys }),
    ...(query.sortBy === undefined ? {} : { "sort-by": query.sortBy }),
    ...(query.descending === undefined ? {} : { descending: query.descending }),
    ...(query.limit === undefined ? {} : { limit: query.limit }),
    ...(query.offset === undefined ? {} : { offset: query.offset }),
    ...(query.function === undefined ? {} : { function: query.function }),
    ...(query.target === undefined ? {} : { target: query.target }),
  }
}

export function standingOf(slug: string, given: Given, standsHere: boolean): Standing {
  const query = namedQuery(here(), slug)
  if (query === null) return { where: "here" }
  if (standsHere) return { where: "here" }
  const bound = bind(query, given)
  if (isRefused(bound)) return { where: "refused", why: bound.refused }
  return { where: "there", query: composedOf(bound) }
}

export function pageTypeOf(slug: string): string | null {
  return namedQuery(here(), slug)?.pageType ?? null
}
