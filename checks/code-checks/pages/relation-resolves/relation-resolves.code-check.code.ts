import {
  eachTarget,
  type Known,
  namesIn,
  namingsIn,
  reaches,
  type Shaped,
} from "@akasha/indexes/reaching"
import type { Change } from "@akasha/pages-system/change"
import { pageNamed, partedIn } from "@akasha/pages-system/page-file-name"
import { textAt, type Value, valueIn } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { bodyOf, input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export type Carried = {
  readonly path: string
  readonly value: Value
}

export function valueFor(change: Change, path: string): Value | null {
  const bytes = change.after(path)
  if (bytes === null) return null
  return valueIn(bodyOf({ root: change.root, path, bytes }))
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

export function relationProperties(shadow: Shadow, known: Known): readonly string[] {
  const found: string[] = []
  for (const held of shadow.index.schemaAt().values()) {
    if (known.targetOf(held.slug) !== null) found.push(held.slug)
  }
  return found.sort()
}

export function idTakenFrom(change: Change, path: string): string | null {
  const bytes = change.before(path)
  if (bytes === null) return null
  const value = valueIn(bodyOf({ root: change.root, path, bytes }))
  return value === null ? null : textAt(value, "id")
}

export function namersOf(
  change: Change,
  shadow: Shadow,
  properties: readonly string[]
): readonly string[] {
  const heldInAFile = shadow.index.fileKeysAt()
  const found = new Set<string>()
  for (const path of change.changed) {
    if (change.after(path) !== null) continue
    const said = partedIn(path)
    if (said === null || said.sections.length > 0) continue
    if (heldInAFile.has(said.pageType)) continue
    const gone = idTakenFrom(change, path)
    if (gone === null) continue
    for (const propertySlug of properties) {
      for (const id of shadow.index.idsNaming(gone, propertySlug)) {
        const naming = shadow.index.listedById(id)
        if (naming !== null) found.add(naming.path)
      }
    }
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
    const one = known.byId(id)
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
  mortal: Mortality
): readonly Judged[] {
  const own = textAt(value, "pageTypeSlug")
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
  for (const one of namingsIn(value, known)) judge(one.propertySlug, one.held, one.said)
  return said
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  const took = change.changed.some((one) => change.after(one) === null)
  if (carried.length === 0 && !took) return []
  const known = shadow.index.knownIn()
  const mortal = mortalityIn(shadow, known)
  const said: Judged[] = []
  for (const one of carried) said.push(...danglingIn(one.path, one.value, known, mortal))
  if (!took) return said
  const carrying = new Set(carried.map((one) => one.path))
  for (const path of namersOf(change, shadow, relationProperties(shadow, known))) {
    if (carrying.has(path)) continue
    const value = valueFor(change, path)
    if (value !== null) said.push(...danglingIn(path, value, known, mortal))
  }
  return said
}

export const relationResolves = input(PAGES, refusalsIn)
