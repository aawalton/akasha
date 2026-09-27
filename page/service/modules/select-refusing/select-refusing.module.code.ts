import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { SELECT_OPS } from "akasha/page/core/property-type/modules/select/select.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugsIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { selectProperty } from "akasha/page/select-property/select-property.page-type.ts"
import {
  type Carried,
  pageAt,
  type Source,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const EXTENDS = "extends"

const VALUES = "values"

function setIn(held: unknown): readonly string[] | null {
  if (Array.isArray(held)) return held.filter((one): one is string => typeof one === "string")
  if (typeof held === "object" && held !== null) return Object.keys(held)
  return null
}

function selectSetFor(root: string, one: Carried, source: Source): readonly string[] | null {
  const climbed: Value[] = []
  const waiting = [one.pageTypeSlug]
  for (let at = 0; at < waiting.length; at += 1) {
    const own = waiting[at]
    if (own === undefined || waiting.indexOf(own) !== at) continue
    const typed = source.pageTypeAt(own)
    if (typed === null) continue
    climbed.push(typed)
    waiting.push(...slugsIn(typed[EXTENDS]))
  }
  if (!waiting.includes(selectProperty.slug)) return null
  const page = pageAt(root, one.pageTypeSlug, one.pagePropertySlug, (path) => valueAt(path, root))
  for (const held of [page, ...climbed]) {
    const set = held === null ? null : setIn(held[VALUES])
    if (set !== null) return set
  }
  return null
}

function shownIn(set: readonly string[]): string {
  return set.length === 0 ? "none" : set.map((each) => `\`${each}\``).join(", ")
}

export function selectRefused(
  root: string,
  one: Carried,
  value: unknown,
  source: Source
): string | null {
  if (value === null || value === undefined) return null
  const set = selectSetFor(root, one, source)
  if (set === null) return null
  const definition: PropertyDefinition = {
    id: one.key,
    title: one.key,
    type: "select",
    config: { options: set.map((id) => ({ id, label: id })) },
  }
  for (const held of Array.isArray(value) ? value : [value]) {
    if (typeof held === "string" && SELECT_OPS.validate(held, definition) === null) continue
    return (
      `\`${one.key}\` is \`${one.pageTypeSlug}/${one.pagePropertySlug}\`, whose values are ` +
      `${shownIn(set)}, and this write hands over ${String(JSON.stringify(held))} under it. ` +
      "A value outside that set is refused rather than kept as text."
    )
  }
  return null
}
