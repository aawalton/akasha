import { addressIn, type PageAddress } from "@akasha/pages/page-address"
import { exportedAs } from "@akasha/pages/page-export-name"
import { propertiesIfNamedOf } from "@akasha/pages/page-type-properties"
import { slugOf, slugsIn, textAt, type Value } from "@akasha/pages/page-value"
import { schemaAt } from "../entries/index-entries.module.code.ts"
import { everyOfType, type Listed, listedEvery } from "../reading/index-reading.module.code.ts"
import type { Reading } from "../shape/index-shape.module.code.ts"

const RECORD = "record-property"

const ONE_OF = "one-of-property"

const MEMBERS = "members"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const MORTAL = "mortal"

const SCOPED = "page-property"

const SLUG = "slug"

const FILED_AS_IDENTITY = new Set(["id", "slug", "pageTypeSlug"])

export type Wanted = string | readonly string[] | null

export type Known = {
  readonly targetOf: (propertySlug: string) => Wanted
  readonly admitting: (target: string) => readonly string[]
  readonly mortal: (pageTypeSlug: string) => boolean
  readonly scoping: (pageTypeSlug: string) => Scoping | null
  readonly filed: (address: PageAddress) => readonly Listed[]
}

export type Scoping = {
  readonly scopePropertySlug: string
  readonly propertySlug: string
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

function membersIn(value: Value): readonly string[] {
  const named = value[MEMBERS]
  if (!Array.isArray(named)) return []
  const found: string[] = []
  for (const one of named) {
    if (typeof one === "string") found.push(slugOf(one))
  }
  return found
}

export function knownIn(reading: Reading, pageOf: (path: string) => Value | null): Shaped {
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
    for (const one of propertiesIfNamedOf(pageTypeSlug, reading, pageOf) ?? []) {
      made.set(one.key, one.pagePropertySlug)
    }
    carried.set(pageTypeSlug, made)
    return made
  }

  const scoped = new Map<string, Scoping | null>()
  const scopingOf = (pageTypeSlug: string): Scoping | null => {
    const found = scoped.get(pageTypeSlug)
    if (found !== undefined) return found
    let said: Scoping | null = null
    for (const one of propertiesIfNamedOf(pageTypeSlug, reading, pageOf) ?? []) {
      if (one.unique !== SCOPED || one.uniquePropertySlug === undefined) continue
      said = {
        scopePropertySlug: slugOf(one.uniquePropertySlug),
        propertySlug: one.propertySlug,
      }
      break
    }
    scoped.set(pageTypeSlug, said)
    return said
  }

  const above = new Map<string, readonly string[]>()
  const dies = new Set<string>()
  for (const one of everyOfType(reading, "page-type")) {
    const value = pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const named = slugsIn(value["extendsSlug"])
    if (slug !== null && named.length > 0) above.set(slug, named)
    if (slug !== null && value[MORTAL] === true) dies.add(slug)
  }
  const everyType = new Set<string>([...above.keys(), ...[...above.values()].flat()])

  const fields = new Map<string, readonly string[]>()
  for (const one of everyOfType(reading, RECORD)) {
    const value = pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    if (slug !== null) fields.set(slug, fieldsIn(value))
  }

  const members = new Map<string, readonly string[]>()
  for (const one of everyOfType(reading, ONE_OF)) {
    const value = pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    if (slug !== null) members.set(slug, membersIn(value))
  }

  const targetOf = (propertySlug: string): Wanted => {
    const held = target.get(propertySlug)
    if (held !== undefined) return held
    const found: string[] = []
    for (const one of members.get(propertySlug) ?? []) {
      const said = target.get(one)
      if (said !== undefined && !found.includes(said)) found.push(said)
    }
    return found.length === 0 ? null : found
  }

  const admitting = (wanted: string): readonly string[] => {
    const found: string[] = []
    for (const one of everyType) {
      const walked = new Set<string>()
      const waiting: string[] = [one]
      for (let at = 0; at < waiting.length; at += 1) {
        const here = waiting[at]
        if (here === undefined || walked.has(here)) continue
        if (here === wanted) {
          found.push(one)
          break
        }
        walked.add(here)
        for (const up of above.get(here) ?? []) waiting.push(up)
      }
    }
    return found
  }

  return {
    targetOf,
    admitting,
    mortal: (pageTypeSlug) => dies.has(pageTypeSlug),
    scoping: scopingOf,
    filed: (address) => listedEvery(reading, address),
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

export function filedById(known: Known, id: string): Listed | null {
  return known.filed({ id })[0] ?? null
}

export type Reached = { readonly id: string } | { readonly refused: string }

function only(found: readonly Listed[]): Listed | null {
  const one = found[0]
  return found.length === 1 && one !== undefined ? one : null
}

export function eachTarget(wanted: Wanted): readonly string[] {
  if (wanted === null) return []
  return typeof wanted === "string" ? [wanted] : wanted
}

function saidAs(every: readonly string[]): string {
  return every.map((one) => `\`${one}\``).join(" or ")
}

function onceEach(found: readonly Listed[]): readonly Listed[] {
  const seen = new Set<string>()
  const kept: Listed[] = []
  for (const one of found) {
    if (seen.has(one.id)) continue
    seen.add(one.id)
    kept.push(one)
  }
  return kept
}

function admitsNone(named: string, pageTypeSlug: string, every: readonly string[]): string {
  const one = every[0]
  const admits =
    every.length === 1 && one !== undefined ? `\`${one}\` and what extends it` : saidAs(every)
  return `\`${named}\` names a \`${pageTypeSlug}\`, and this property admits only ${admits}`
}

function among(named: string, found: readonly Listed[]): string {
  return `\`${named}\` narrows to ${found.length} pages and must name its page type — ${found
    .map((one) => one.path)
    .join(", ")}`
}

export function reaches(named: string, wanted: Wanted, known: Known): Reached {
  const address = addressIn(named)
  const every = eachTarget(wanted)
  if (address.kind === "id") {
    return known.filed({ id: address.id }).length === 0
      ? { refused: `no page carries the id \`${address.id}\`` }
      : { id: address.id }
  }
  if (address.kind === "qualified") {
    const { pageTypeSlug, slug } = address
    if (every.length > 0 && !every.some((one) => known.admitting(one).includes(pageTypeSlug))) {
      return { refused: admitsNone(named, pageTypeSlug, every) }
    }
    const listed = known.filed({ pageTypeSlug, propertySlug: SLUG, value: slug })
    const held = only(listed)
    if (held !== null) return { id: held.id }
    if (listed.length === 0)
      return { refused: `no \`${pageTypeSlug}\` carries the slug \`${slug}\`` }
    return { refused: among(named, listed) }
  }
  if (address.kind === "scoped") {
    const { pageTypeSlug, scope, slug } = address
    if (every.length > 0 && !every.some((one) => known.admitting(one).includes(pageTypeSlug))) {
      return { refused: admitsNone(named, pageTypeSlug, every) }
    }
    const said = known.scoping(pageTypeSlug)
    const filed =
      said === null
        ? []
        : known.filed({
            pageTypeSlug,
            scopePropertySlug: said.scopePropertySlug,
            scopeValue: scope,
            propertySlug: said.propertySlug,
            value: slug,
          })
    const kept = only(filed)
    if (kept !== null) return { id: kept.id }
    if (filed.length === 0) {
      return { refused: `no \`${pageTypeSlug}\` within \`${scope}\` carries the slug \`${slug}\`` }
    }
    return { refused: among(named, filed) }
  }
  if (every.length === 0) {
    return { refused: `\`${named}\` names no page type and its property declares no target` }
  }
  const reached = onceEach(
    every.flatMap((one) =>
      known
        .admitting(one)
        .flatMap((pageTypeSlug) =>
          known.filed({ pageTypeSlug, propertySlug: SLUG, value: address.slug })
        )
    )
  )
  const single = only(reached)
  if (single !== null) return { id: single.id }
  if (reached.length === 0)
    return { refused: `no page admitting ${saidAs(every)} carries the slug \`${named}\`` }
  return { refused: among(named, reached) }
}

export function namesMortal(named: string, wanted: Wanted, known: Known): boolean {
  const address = addressIn(named)
  if (address.kind === "qualified" || address.kind === "scoped") {
    return known.mortal(address.pageTypeSlug)
  }
  const every = eachTarget(wanted)
  return every.length > 0 && every.every((one) => known.mortal(one))
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
  readonly identity: boolean
}

export function namingsIn(value: Value, known: Shaped): readonly Naming[] {
  const found: Naming[] = []
  for (const [key, held] of Object.entries(value)) {
    if (held === null) continue
    const propertySlug = known.slugOfKeyIn(value, key)
    if (propertySlug === null) continue
    const identity = FILED_AS_IDENTITY.has(key)
    if (known.targetOf(propertySlug) !== null) {
      found.push({ key, propertySlug, said: propertySlug, held, identity })
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
          identity,
        })
      }
    }
  }
  return found
}
