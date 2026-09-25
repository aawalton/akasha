import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"

const PAGE_TYPE = "page-type"

const SLUG = "slug"

const PLURAL = "pluralSlug"

type Reading = Pick<Answering, "everyOfType" | "pageByPath">

export function pluralsIn(index: Reading): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of index.everyOfType(PAGE_TYPE)) {
    const value = index.pageByPath(one.path)
    if (value === null) continue
    const named = value[PLURAL]
    const slug = value[SLUG]
    if (typeof named !== "string" || typeof slug !== "string") continue
    const held = found.get(named)
    if (held === undefined) found.set(named, [slug])
    else held.push(slug)
  }
  return found
}
