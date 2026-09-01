import { addressIn } from "../../page/page-address/page-address.module.code.ts"
import { exportedAs } from "../../page/page-export-name/page-export-name.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
  valueAt,
} from "../../page/page-value/page-value.module.code.ts"
import { propertiesOf } from "../../page-type/page-type-properties/page-type-properties.module.code.ts"
import { schemaAt } from "../index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  type Listed,
  listedAt,
  listedById,
} from "../index-reading/index-reading.module.code.ts"
import type { Reading } from "../index-shape/index-shape.module.code.ts"
import { readingOf } from "../index-surface/index-surface.module.code.ts"

const RECORD = "record-property"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const NOT_A_RELATION = new Set(["id", "slug", "pageTypeSlug"])

export type Known = {
  readonly targetOf: (propertySlug: string) => string | null
  readonly admitting: (target: string) => readonly string[]
  readonly at: (pageTypeSlug: string, slug: string) => readonly Listed[]
  readonly byId: (id: string) => Listed | null
}

export type Shaped = Known & {
  readonly fieldsOf: (propertySlug: string) => readonly string[]
  readonly slugOfKeyIn: (value: Value, key: string) => string | null
  readonly fieldOfKey: (propertySlug: string, key: string) => string | null
}

function fieldsIn(value: Value): readonly string[] {
  const declared = value[DECLARED]
  if (!Array.isArray(declared)) return []
  const found: string[] = []
  for (const one of declared) {
    if (one === null || typeof one !== "object") continue
    const named = (one as Value)[SAID]
    if (typeof named === "string") found.push(slugOf(named))
  }
  return found
}

export function knownIn(
  given: string | Reading,
  repo: string,
  pageOf: (path: string) => Value | null = (path) => valueAt(path, repo)
): Shaped {
  const reading = readingOf(given)
  const target = new Map<string, string>()
  const keyOfSlug = new Map<string, string>()
  const keyed = new Map<string, string[]>()
  for (const held of schemaAt(reading).values()) {
    const named = held.pageTypeSlug === "relation-property" ? held.targetPageTypeSlug : null
    if (named !== null) target.set(held.slug, named)
    if (held.propertySlug === "") continue
    const key = exportedAs(held.propertySlug)
    keyOfSlug.set(held.slug, key)
    keyed.set(key, [...(keyed.get(key) ?? []), held.slug])
  }
  const carried = new Map<string, ReadonlyMap<string, string>>()
  const carriedBy = (pageTypeSlug: string): ReadonlyMap<string, string> => {
    const found = carried.get(pageTypeSlug)
    if (found !== undefined) return found
    const made = new Map<string, string>()
    for (const one of propertiesOf(pageTypeSlug, reading, pageOf)) {
      made.set(one.key, one.pagePropertySlug)
    }
    carried.set(pageTypeSlug, made)
    return made
  }

  const above = new Map<string, string>()
  for (const one of everyOfType(reading, "page-type")) {
    const value = pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const extendsSlug = textAt(value, "extendsSlug")
    if (slug !== null && extendsSlug !== null) above.set(slug, slugOf(extendsSlug))
  }
  const everyType = new Set<string>([...above.keys(), ...above.values()])

  const fields = new Map<string, readonly string[]>()
  for (const one of everyOfType(reading, RECORD)) {
    const value = pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    if (slug !== null) fields.set(slug, fieldsIn(value))
  }

  const targetOf = (propertySlug: string): string | null => {
    return target.get(propertySlug) ?? null
  }

  const admitting = (wanted: string): readonly string[] => {
    const found: string[] = []
    for (const one of everyType) {
      const walked = new Set<string>()
      let here: string | undefined = one
      while (here !== undefined && !walked.has(here)) {
        if (here === wanted) {
          found.push(one)
          break
        }
        walked.add(here)
        here = above.get(here)
      }
    }
    return found
  }

  return {
    targetOf,
    admitting,
    at: (pageTypeSlug, slug) => listedAt(reading, pageTypeSlug, slug),
    byId: (id) => listedById(reading, id),
    fieldsOf: (propertySlug) => fields.get(propertySlug) ?? [],
    slugOfKeyIn: (value, key) => {
      const held = keyed.get(key) ?? []
      const one = held[0]
      if (one === undefined) return null
      if (held.length === 1) return one
      const stated = textAt(value, "pageTypeSlug")
      if (stated === null) return null
      const said = carriedBy(slugOf(stated)).get(key)
      return said === undefined ? null : said
    },
    fieldOfKey: (propertySlug, key) => {
      for (const one of fields.get(propertySlug) ?? []) {
        if (keyOfSlug.get(one) === key) return one
      }
      return null
    },
  }
}

export type Reached = { readonly id: string } | { readonly refused: string }

function only(found: readonly Listed[]): Listed | null {
  const one = found[0]
  return found.length === 1 && one !== undefined ? one : null
}

function among(named: string, found: readonly Listed[]): string {
  return `\`${named}\` narrows to ${found.length} pages and must name its page type — ${found
    .map((one) => one.path)
    .join(", ")}`
}

export function reaches(named: string, wanted: string | null, known: Known): Reached {
  const address = addressIn(named)
  if (address.kind === "id") {
    return known.byId(address.id) === null
      ? { refused: `no page carries the id \`${address.id}\`` }
      : { id: address.id }
  }
  if (address.kind === "qualified") {
    const { pageTypeSlug, slug } = address
    if (wanted !== null && !known.admitting(wanted).includes(pageTypeSlug)) {
      return {
        refused:
          `\`${named}\` names a \`${pageTypeSlug}\`, and this property admits only ` +
          `\`${wanted}\` and what stands under it`,
      }
    }
    const found = known.at(pageTypeSlug, slug)
    const one = only(found)
    if (one !== null) return { id: one.id }
    if (found.length === 0)
      return { refused: `no \`${pageTypeSlug}\` carries the slug \`${slug}\`` }
    return { refused: among(named, found) }
  }
  if (wanted === null) {
    return { refused: `\`${named}\` names no page type and its property declares no target` }
  }
  const found = known
    .admitting(wanted)
    .flatMap((pageTypeSlug) => known.at(pageTypeSlug, address.slug))
  const one = only(found)
  if (one !== null) return { id: one.id }
  if (found.length === 0)
    return { refused: `no page admitting \`${wanted}\` carries the slug \`${named}\`` }
  return { refused: among(named, found) }
}

export function namesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function recordsIn(held: unknown): readonly Value[] {
  const listed = Array.isArray(held) ? held : [held]
  return listed.filter(
    (one): one is Value => one !== null && typeof one === "object" && !Array.isArray(one)
  )
}

export type Naming = {
  readonly key: string
  readonly propertySlug: string
  readonly said: string
  readonly held: unknown
  readonly own: boolean
}

export function namingsIn(value: Value, known: Shaped): readonly Naming[] {
  const found: Naming[] = []
  for (const [key, held] of Object.entries(value)) {
    if (held === null) continue
    const propertySlug = known.slugOfKeyIn(value, key)
    if (propertySlug === null) continue
    const own = NOT_A_RELATION.has(key)
    if (known.targetOf(propertySlug) !== null) {
      found.push({ key, propertySlug, said: propertySlug, held, own })
      continue
    }
    if (known.fieldsOf(propertySlug).length === 0) continue
    for (const entry of recordsIn(held)) {
      for (const [inner, said] of Object.entries(entry)) {
        if (said === null) continue
        const field = known.fieldOfKey(propertySlug, inner)
        if (field === null) continue
        found.push({
          key: inner,
          propertySlug: field,
          said: `${propertySlug} ${field}`,
          held: said,
          own,
        })
      }
    }
  }
  return found
}
