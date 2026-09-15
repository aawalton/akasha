import {
  type Carried,
  propertiesIfNamed,
  type Source,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

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
