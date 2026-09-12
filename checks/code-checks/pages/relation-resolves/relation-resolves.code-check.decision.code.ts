import {
  pageOfRow,
  textIn,
  textWas,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { type Rowing, rowsOver } from "akasha/pages/entries/page-entries.module.code.ts"
import { pageNamed, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  eachTarget,
  filedById,
  type Known,
  namesIn,
  namingsIn,
  namingsInRows,
  reaches,
  type Shaped,
} from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export type Carried = {
  readonly path: string
  readonly value: Value
}

function valueFor(change: Change, path: string): Value | null {
  const text = textIn(change, path)
  if (text === null) return null
  return valueIn(text)
}

export function carriedBy(change: Change, pageTypes: ReadonlySet<string>): readonly Carried[] {
  const found: Carried[] = []
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const value = valueFor(change, path)
    if (value !== null) found.push({ path, value })
  }
  return found
}

function rowedBy(change: Change, shadow: Shadow): readonly Carried[] {
  const carrying = new Set(change.changed)
  const found: Carried[] = []
  const seen = new Set<string>()
  for (const path of change.changed) {
    const page = pageOfRow(path, shadow)
    if (page === null || carrying.has(page) || seen.has(page)) continue
    seen.add(page)
    const value = shadow.pageOf(page)
    if (value !== null) found.push({ path: page, value })
  }
  return found
}

function rowsFor(change: Change, known: Shaped, one: Carried): readonly Rowing[] {
  return rowsOver(one.path, one.value, known.entriedIn(one.value), (at) => textIn(change, at))
}

function idTakenFrom(change: Change, path: string): string | null {
  const text = textWas(change, path)
  if (text === null) return null
  const value = valueIn(text)
  return value === null ? null : textAt(value, "id")
}

export function namersOf(change: Change, shadow: Shadow): readonly string[] {
  const heldInAFile = shadow.index.fileKeysAt()
  const found = new Set<string>()
  for (const path of change.changed) {
    if (change.after(path) !== null) continue
    const said = partedIn(path)
    if (said === null || said.sections.length > 0) continue
    if (heldInAFile.has(said.pageType)) continue
    const gone = idTakenFrom(change, path)
    if (gone === null) continue
    for (const one of shadow.index.namersOf(gone)) found.add(one.path)
  }
  return [...found].sort()
}

export type Mortality = {
  readonly stated: (pageTypeSlug: string) => boolean
  readonly reached: (id: string) => string | null
}

const PAGE_TYPE = "page-type"

export function pageTypeOf(path: string): string | null {
  return partedIn(path)?.pageType ?? null
}

export function mortalityIn(shadow: Shadow, known: Known): Mortality {
  const byType = new Map<string, boolean>()
  const byPage = new Map<string, string | null>()
  const stated = (pageTypeSlug: string): boolean => {
    const held = byType.get(pageTypeSlug)
    if (held !== undefined) return held
    const one = shadow.index.listedAt(PAGE_TYPE, pageTypeSlug)[0]
    const value = one === undefined ? null : shadow.pageOf(one.path)
    const said = value !== null && value["mortal"] === true
    byType.set(pageTypeSlug, said)
    return said
  }
  const reached = (id: string): string | null => {
    const held = byPage.get(id)
    if (held !== undefined) return held
    const one = filedById(known, id)
    const pageTypeSlug = one === null ? null : pageTypeOf(one.path)
    const said = pageTypeSlug !== null && stated(pageTypeSlug) ? pageTypeSlug : null
    byPage.set(id, said)
    return said
  }
  return { stated, reached }
}

function cannot(propertySlug: string, pageTypeSlug: string): string {
  return `states \`${propertySlug}\`, and a page that is not mortal cannot name a mortal \`${pageTypeSlug}\``
}

export function danglingIn(
  path: string,
  value: Value,
  known: Shaped,
  mortal: Mortality,
  rowing: readonly Rowing[]
): readonly Judged[] {
  const own = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (own !== null && mortal.stated(own)) return []
  const said: Judged[] = []
  const seen = new Set<string>()
  const judge = (propertySlug: string, held: unknown, where: string): undefined => {
    const wanted = known.targetOf(propertySlug)
    const every = eachTarget(wanted)
    if (every.length === 0) return
    const names = namesIn(held)
    if (names.length === 0) return
    const one = every.length === 1 ? every[0] : undefined
    if (one !== undefined && mortal.stated(one)) {
      if (seen.has(where)) return
      seen.add(where)
      said.push({ path, reason: cannot(where, one) })
      return
    }
    for (const named of names) {
      const once = `${where}\n${named}`
      if (seen.has(once)) continue
      seen.add(once)
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        said.push({ path, reason: `states \`${where}\`, and ${reached.refused}` })
        continue
      }
      const dies = mortal.reached(reached.id)
      if (dies !== null) said.push({ path, reason: cannot(where, dies) })
    }
  }
  for (const one of [...namingsIn(value, known), ...namingsInRows(rowing, known)]) {
    judge(one.propertySlug, one.held, one.said)
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = [...carriedBy(change, shadow.index.pageTypesIn()), ...rowedBy(change, shadow)]
  const took = change.changed.some((one) => change.after(one) === null)
  if (carried.length === 0 && !took) return []
  const known = shadow.index.knownIn()
  const mortal = mortalityIn(shadow, known)
  const said: Judged[] = []
  for (const one of carried) {
    said.push(...danglingIn(one.path, one.value, known, mortal, rowsFor(change, known, one)))
  }
  if (!took) return said
  const carrying = new Set(carried.map((one) => one.path))
  for (const path of namersOf(change, shadow)) {
    if (carrying.has(path)) continue
    const value = valueFor(change, path)
    if (value === null) continue
    said.push(...danglingIn(path, value, known, mortal, rowsFor(change, known, { path, value })))
  }
  return said
}
