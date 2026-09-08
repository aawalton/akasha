import { readingIn, valuesOfType } from "@akasha/pages/index-reading"
import { kindsUnder } from "@akasha/pages/page-type-descent"
import {
  type Carried,
  carriedFrom,
  pageAt,
  propertiesIfNamed,
  type Source,
  sourceIn,
} from "@akasha/pages/page-type-properties"
import { textAt, type Value, valueAt } from "@akasha/pages/page-value"

const PROSE = "standard-agent-english-property"

const RECORD = "record-property"

const PAGE_TYPE = "page-type"

type Read = ReturnType<typeof readingIn>

export type ProseAt = {
  readonly key: string
  readonly under: readonly string[]
}

export type Reach = {
  readonly prose: ReadonlySet<string>
  readonly record: ReadonlySet<string>
  readonly source: Source
  readonly fieldsOf: (one: Carried) => readonly Carried[]
}

export function reachIn(given: string | Read, pageOf: (path: string) => Value | null): Reach {
  const source = sourceIn(given, pageOf)
  return {
    prose: kindsUnder(PROSE, given, pageOf),
    record: kindsUnder(RECORD, given, pageOf),
    source,
    fieldsOf: (one) => {
      const value = pageAt(given, one.pageTypeSlug, one.pagePropertySlug, pageOf)
      return value === null ? [] : carriedFrom(value, source, one.pagePropertySlug)
    },
  }
}

function atOf(route: readonly string[], key: string): ProseAt {
  const first = route[0]
  if (first === undefined) return { key, under: [] }
  return { key: first, under: [...route.slice(1), key] }
}

function proseAmong(
  carried: readonly Carried[],
  route: readonly string[],
  walked: ReadonlySet<string>,
  reach: Reach
): readonly ProseAt[] {
  const found: ProseAt[] = []
  for (const one of carried) {
    if (reach.prose.has(one.pageTypeSlug)) {
      found.push(atOf(route, one.key))
      continue
    }
    if (!reach.record.has(one.pageTypeSlug)) continue
    const named = `${one.pageTypeSlug}/${one.pagePropertySlug}`
    if (walked.has(named)) continue
    const under = new Set([...walked, named])
    found.push(...proseAmong(reach.fieldsOf(one), [...route, one.key], under, reach))
  }
  return found
}

export function proseFrom(pageTypeSlug: string, reach: Reach): readonly ProseAt[] {
  const carried = propertiesIfNamed(pageTypeSlug, reach.source)
  if (carried === null) return []
  return proseAmong(carried, [], new Set(), reach)
}

export function proseUnder(root: string): ReadonlyMap<string, readonly ProseAt[]> {
  const reading = readingIn(root)
  const pageOf = (path: string): Value | null => {
    try {
      return valueAt(path, root)
    } catch {
      return null
    }
  }
  const reach = reachIn(reading, pageOf)
  const found = new Map<string, readonly ProseAt[]>()
  for (const kind of kindsUnder(PAGE_TYPE, reading, pageOf)) {
    for (const one of valuesOfType(reading, kind)) {
      const slug = textAt(one.value, "slug")
      if (slug === null) continue
      const at = proseFrom(slug, reach)
      if (at.length > 0) found.set(slug, at)
    }
  }
  return found
}
