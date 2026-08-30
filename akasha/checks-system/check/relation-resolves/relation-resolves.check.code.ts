import {
  pageTypesIn,
  schemaAt,
  textAt,
  type Value,
  valueIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  idsNaming,
  standingAt,
  standingById,
  standingByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  type Known,
  knownIn,
  namesIn,
  reaches,
  recordsIn,
  type Shaped,
} from "../../../pages-system/indexes/reaching/reaching.module.code.ts"
import {
  namedIn,
  pageNamed,
} from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { slugFor } from "../../../pages-system/page-property/page-property-key/page-property-key.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { bodyOf } from "../../checking/checking.module.code.ts"
import type { Change, Judged } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

export type Carried = {
  readonly path: string
  readonly value: Value
}

export function valueFor(change: Change, path: string): Value | null {
  const bytes = change.after(path)
  if (bytes === null) return null
  const text = bodyOf({ root: change.root, path, bytes })
  return text === null ? null : valueIn(text)
}

export function carriedBy(change: Change, pageTypes: ReadonlySet<string>): readonly Carried[] {
  const found: Carried[] = []
  for (const path of change.changed) {
    if (!path.startsWith(INSIDE) || !pageNamed(path, pageTypes)) continue
    const value = valueFor(change, path)
    if (value !== null) found.push({ path, value })
  }
  return found
}

export function relationProperties(shadow: Shadow, known: Known): readonly string[] {
  const found: string[] = []
  for (const held of schemaAt(shadow.reading).values()) {
    if (known.targetOf(held.slug) !== null) found.push(held.slug)
  }
  return found.sort()
}

export function namersOf(change: Change, properties: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const path of change.changed) {
    if (change.after(path) !== null) continue
    for (const gone of standingByPath(change.root, path)) {
      if (gone.path !== path) continue
      for (const propertySlug of properties) {
        for (const id of idsNaming(change.root, gone.id, propertySlug)) {
          const naming = standingById(change.root, id)
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

export function mortalityIn(shadow: Shadow, known: Known): Mortality {
  const byType = new Map<string, boolean>()
  const byPage = new Map<string, string | null>()
  const stated = (pageTypeSlug: string): boolean => {
    const held = byType.get(pageTypeSlug)
    if (held !== undefined) return held
    const one = standingAt(shadow.reading, PAGE_TYPE, pageTypeSlug)[0]
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
    if (wanted === null) return
    const names = namesIn(held)
    if (names.length === 0) return
    if (mortal.stated(wanted)) {
      if (seen.has(where)) return
      seen.add(where)
      said.push({ path, reason: cannot(where, wanted) })
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
  for (const [key, held] of Object.entries(value)) {
    if (held === null) continue
    const propertySlug = slugFor(key)
    if (known.targetOf(propertySlug) !== null) {
      judge(propertySlug, held, propertySlug)
      continue
    }
    const fields = known.fieldsOf(propertySlug)
    if (fields.length === 0) continue
    for (const entry of recordsIn(held)) {
      for (const [field, inner] of Object.entries(entry)) {
        if (inner === null) continue
        const fieldSlug = slugFor(field)
        if (!fields.includes(fieldSlug)) continue
        judge(fieldSlug, inner, `${propertySlug} ${fieldSlug}`)
      }
    }
  }
  return said
}

export function relationResolves(change: Change, shadow: Shadow): readonly Judged[] {
  const carried = carriedBy(change, pageTypesIn(shadow.reading))
  const took = change.changed.some((one) => change.after(one) === null)
  if (carried.length === 0 && !took) return []
  const known = knownIn(shadow.reading, change.root, shadow.pageOf)
  const mortal = mortalityIn(shadow, known)
  const said: Judged[] = []
  for (const one of carried) said.push(...danglingIn(one.path, one.value, known, mortal))
  if (!took) return said
  const carrying = new Set(carried.map((one) => one.path))
  for (const path of namersOf(change, relationProperties(shadow, known))) {
    if (carrying.has(path)) continue
    const value = valueFor(change, path)
    if (value !== null) said.push(...danglingIn(path, value, known, mortal))
  }
  return said
}
