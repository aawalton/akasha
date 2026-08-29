import {
  type Known,
  knownIn,
  pageTypesIn,
  reaches,
  type Standing,
  schemaAt,
  type Value,
  valueAt,
  valueIn,
} from "../../../data-system/index/index-entries.module.code.ts"
import {
  idsNaming,
  indexIn,
  standingAt,
  standingById,
  standingByPath,
} from "../../../data-system/index/index-reading.module.code.ts"
import { slugFor } from "../../../pages-system/page-property/page-property-key.module.code.ts"
import { namedIn, pageNamed } from "../../../pages-system/page/page-file-name.module.code.ts"
import { bodyOf } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const INSIDE = "akasha/"

export type Carried = {
  readonly path: string
  readonly value: Value
}

type Named = Standing & {
  readonly slug: string
  readonly pageTypeSlug: string
}

function textAt(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

function namesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function valueFor(leaving: Leaving, path: string): Value | null {
  const bytes = leaving.at(path)
  if (bytes === null) return null
  const text = bodyOf({ root: leaving.root, path, bytes })
  return text === null ? null : valueIn(text)
}

export function carriedBy(leaving: Leaving, pageTypes: ReadonlySet<string>): readonly Carried[] {
  const found: Carried[] = []
  for (const path of leaving.changed) {
    if (!path.startsWith(INSIDE) || !pageNamed(path, pageTypes)) continue
    const value = valueFor(leaving, path)
    if (value !== null) found.push({ path, value })
  }
  return found
}

function namedBy(carried: readonly Carried[]): readonly Named[] {
  const found: Named[] = []
  for (const one of carried) {
    const id = textAt(one.value, "id")
    const slug = textAt(one.value, "slug")
    const pageTypeSlug = textAt(one.value, "pageTypeSlug")
    if (id === null || slug === null || pageTypeSlug === null) continue
    found.push({ path: one.path, id, slug, pageTypeSlug })
  }
  return found
}

export function knownAcross(leaving: Leaving, carried: readonly Carried[]): Known {
  const base = knownIn(indexIn(leaving.root), leaving.root)
  const touched = new Set(leaving.changed)
  const held = namedBy(carried)
  const left = (found: readonly Standing[]): readonly Standing[] =>
    found.filter((one) => !touched.has(one.path))
  return {
    targetOf: base.targetOf,
    admitting: base.admitting,
    at: (pageTypeSlug, slug) => [
      ...left(base.at(pageTypeSlug, slug)),
      ...held.filter((one) => one.pageTypeSlug === pageTypeSlug && one.slug === slug),
    ],
    byId: (id) => {
      const carrying = held.find((one) => one.id === id)
      if (carrying !== undefined) return carrying
      const one = base.byId(id)
      return one === null || touched.has(one.path) ? null : one
    },
  }
}

export function relationProperties(root: string, known: Known): readonly string[] {
  const found: string[] = []
  for (const slug of schemaAt(indexIn(root)).keys()) {
    if (known.targetOf(slug) !== null) found.push(slug)
  }
  return found.sort()
}

export function namersOf(leaving: Leaving, properties: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const path of leaving.changed) {
    if (leaving.at(path) !== null) continue
    for (const gone of standingByPath(leaving.root, path)) {
      if (gone.path !== path) continue
      for (const propertySlug of properties) {
        for (const id of idsNaming(leaving.root, gone.id, propertySlug)) {
          const naming = standingById(leaving.root, id)
          if (naming !== null) found.add(naming.path)
        }
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
  return namedIn(path)?.tail ?? null
}

export function mortalityIn(root: string, known: Known): Mortality {
  const byType = new Map<string, boolean>()
  const byPage = new Map<string, string | null>()
  const stated = (pageTypeSlug: string): boolean => {
    const held = byType.get(pageTypeSlug)
    if (held !== undefined) return held
    const one = standingAt(root, PAGE_TYPE, pageTypeSlug)[0]
    const value = one === undefined ? null : valueAt(one.path, root)
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
  known: Known,
  mortal: Mortality
): readonly Judged[] {
  const own = textAt(value, "pageTypeSlug")
  if (own !== null && mortal.stated(own)) return []
  const said: Judged[] = []
  for (const [key, held] of Object.entries(value)) {
    if (held === null) continue
    const propertySlug = slugFor(key)
    const wanted = known.targetOf(propertySlug)
    if (wanted === null) continue
    const names = namesIn(held)
    if (names.length === 0) continue
    if (mortal.stated(wanted)) {
      said.push({ path, reason: cannot(propertySlug, wanted) })
      continue
    }
    for (const named of names) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        said.push({ path, reason: `states \`${propertySlug}\`, and ${reached.refused}` })
        continue
      }
      const dies = mortal.reached(reached.id)
      if (dies !== null) said.push({ path, reason: cannot(propertySlug, dies) })
    }
  }
  return said
}

export function relationResolves(leaving: Leaving): readonly Judged[] {
  const pageTypes = pageTypesIn(indexIn(leaving.root))
  const carried = carriedBy(leaving, pageTypes)
  const took = leaving.changed.some((one) => leaving.at(one) === null)
  if (carried.length === 0 && !took) return []
  const known = knownAcross(leaving, carried)
  const mortal = mortalityIn(leaving.root, known)
  const said: Judged[] = []
  for (const one of carried) said.push(...danglingIn(one.path, one.value, known, mortal))
  if (!took) return said
  const carrying = new Set(carried.map((one) => one.path))
  for (const path of namersOf(leaving, relationProperties(leaving.root, known))) {
    if (carrying.has(path)) continue
    const value = valueFor(leaving, path)
    if (value !== null) said.push(...danglingIn(path, value, known, mortal))
  }
  return said
}
