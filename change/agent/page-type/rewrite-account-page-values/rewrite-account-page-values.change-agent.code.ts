import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  type Splice,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { valuesWrittenAnewInEntries } from "akasha/change/modules/json-entries/json-entries.module.code.ts"
import { statedIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import { entriesBeside } from "akasha/change/modules/page-property-carrying/page-property-carrying.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  slugOf,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PAGE_TYPE = "page-type"

const KEY = "key"

const FROM = "from"

const TO = "to"

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PAGE_TYPE, KEY, FROM, TO]

export type Rewrite = {
  readonly pageType: string
  readonly key: string
  readonly from: string
  readonly to: string
}

function bodyEdits(world: World, path: string, given: Rewrite): readonly FileChange[] | string {
  const text = world.textOf(path)
  if (text === null) return `\`${path}\` could not be read`
  const source = parsedAs(path, text)
  const one = statedIn(source).get(given.key)
  if (one === undefined || one.text !== given.from) return []
  const spot: Splice = {
    from: one.getStart(source),
    to: one.getEnd(),
    put: JSON.stringify(given.to),
  }
  return splicedIn(path, text, [spot])
}

function besideEdits(
  world: World,
  path: string,
  value: Value,
  entries: readonly Declared[],
  given: Rewrite
): readonly FileChange[] | string {
  const values = new Map([[given.from, given.to]])
  const edits: FileChange[] = []
  for (const one of entries) {
    for (const at of entriesBeside(
      world,
      path,
      value[one.key],
      one.propertySlug,
      one.uncommitted
    )) {
      const text = world.textOf(at)
      if (text === null) return `\`${at}\` could not be read`
      const spots = valuesWrittenAnewInEntries(at, text, given.key, values)
      if (spots.length > 0) edits.push(...splicedIn(at, text, spots))
    }
  }
  return edits
}

function entriesHolding(world: World, kind: string, key: string): readonly Declared[] {
  const known = world.index.knownIn()
  return (world.index.propertiesIfNamed(kind) ?? []).filter(
    (one) =>
      one.pageTypeSlug === ENTRY_PROPERTY &&
      known.rowFieldOfKey(slugOf(one.pagePropertySlug), key) !== null
  )
}

export function rewriteAccountPageValues(world: World, given: Rewrite): Answer {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return refusing(`\`${given.pageType}\` names no page type`)
  }
  const edits: FileChange[] = []
  const seen = new Set<string>()
  for (const kind of world.index.kindsUnder(given.pageType)) {
    const entries = entriesHolding(world, kind, given.key)
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (seen.has(path)) continue
      seen.add(path)
      if (value[given.key] === given.from) {
        const made = bodyEdits(world, path, given)
        if (typeof made === "string") return refusing(made)
        edits.push(...made)
      }
      const beside = besideEdits(world, path, value, entries, given)
      if (typeof beside === "string") return refusing(beside)
      edits.push(...beside)
    }
  }
  if (edits.length === 0) {
    return refusing(`no \`${given.pageType}\` holds \`${given.from}\` under \`${given.key}\``)
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Answer {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return rewriteAccountPageValues(world, { pageType, key, from, to })
}
