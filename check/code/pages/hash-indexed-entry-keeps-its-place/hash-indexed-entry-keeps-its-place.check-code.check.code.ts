import {
  judged,
  keyOf,
  MARKING,
  type Marked,
  markedIn,
  marksOf,
  placeOf,
  rowTypeOf,
  tableOf,
  type World,
} from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/hash-indexed-entry-keeps-its-place.check-code.decision.code.ts"
import {
  input,
  TEXTS,
  textIn,
  textWas,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"

function pageTypeOf(path: string): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return null
  return said.pageType
}

export function markedBefore(change: Change): readonly Marked[] {
  const found: Marked[] = []
  for (const path of change.changed) {
    const kind = pageTypeOf(path)
    if (kind === null || !MARKING.has(kind)) continue
    const text = textWas(change, path)
    const value = text === null ? null : valueIn(text)
    if (value !== null) found.push(...marksOf(path, value))
  }
  return found
}

export function rowsWere(change: Change, now: readonly string[], kind: string): readonly string[] {
  const found = new Set(now.filter((one) => change.before(one) !== null))
  for (const path of change.changed) {
    if (pageTypeOf(path) === kind && change.before(path) !== null) found.add(path)
  }
  return [...found]
}

function touched(one: Marked, paths: readonly string[], changed: ReadonlySet<string>): boolean {
  if (changed.has(one.page) || paths.some((path) => changed.has(path))) return true
  const kind = rowTypeOf(one)
  if (kind === null) return false
  return [...changed].some((path) => pageTypeOf(path) === kind)
}

export function refusalsOver(
  change: Change,
  marks: readonly Marked[],
  rowsOf: (pageTypeSlug: string) => readonly string[]
): readonly Judged[] {
  const now: World = { read: (path) => textIn(change, path), rowsOf }
  const was: World = {
    read: (path) => textWas(change, path),
    rowsOf: (kind) => rowsWere(change, rowsOf(kind), kind),
  }
  const changed = new Set(change.changed)
  const seen = new Set<string>()
  const said: Judged[] = []
  for (const one of marks) {
    const key = keyOf(one)
    if (seen.has(key)) continue
    seen.add(key)
    const after = tableOf(one, now)
    if (!touched(one, after.paths, changed)) continue
    const reason = judged(one, tableOf(one, was), after)
    if (reason !== null) said.push({ path: placeOf(one), reason })
  }
  return said
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const marks = [...markedIn(shadow.index), ...markedBefore(change)]
  const rowsOf = (kind: string): readonly string[] =>
    shadow.index.everyOfType(kind).map((one) => one.path)
  return refusalsOver(change, marks, rowsOf)
}

export const hashIndexedEntryKeepsItsPlace = input(TEXTS, refusalsIn)
