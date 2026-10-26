import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Named = Map<string, ReadonlyMap<string, Value>>

export function pagesOfType(
  root: string,
  named: Named,
  pageTypeSlug: string
): ReadonlyMap<string, Value> {
  const found = named.get(pageTypeSlug)
  if (found !== undefined) return found
  const made = new Map<string, Value>()
  for (const one of valuesOfType(root, pageTypeSlug)) {
    const slug = textAt(one.value, "slug")
    if (slug !== null && !made.has(slug)) made.set(slug, one.value)
  }
  named.set(pageTypeSlug, made)
  return made
}
