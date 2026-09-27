import {
  listedAt,
  readingIn,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  slugOf,
  slugsIn,
  textAt,
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import {
  typeSlugsIn,
  typeValuesIn,
} from "akasha/page/type/modules/gathering/page-type-gathering.module.code.ts"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const DECLARES = "pageProperty"

const WAS_DECLARES = "pagePropertySlug"

const EXTENDS = "extends"

const FALLBACK = "default"

const FIXED = "fixed"

const GROUP = "file-property-group"

const WITHHELD = "uncommitted"

export type Beside = {
  readonly held: string
  readonly uncommitted: boolean
}

type Sidecars = {
  readonly secret: boolean
  readonly uncommitted: boolean
  readonly besides: ReadonlyMap<string, Beside>
}

export type SidecarsBy = ReadonlyMap<string, Sidecars>

type Members = (pageTypeSlug: string) => ReadonlyMap<string, Beside> | null

const noMembers: Members = () => null

const NOTHING: Sidecars = { secret: false, uncommitted: false, besides: new Map() }

function typeNamedIn(declares: string): string | null {
  const at = declares.indexOf("/")
  return at === -1 ? null : declares.slice(0, at)
}

function declaredIn(value: Value, members: Members): Sidecars {
  let secret = false
  let uncommitted = false
  const found = new Map<string, Beside>()
  const declared = value[DECLARED]
  if (!Array.isArray(declared)) return { secret, uncommitted, besides: found }
  for (const one of declared) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const held = one as Record<string, unknown>
    const withheld = held[WITHHELD] === true
    if (held["secret"] === true) secret = true
    if (withheld) uncommitted = true
    const slug = held[DECLARES] ?? held[WAS_DECLARES]
    if (typeof slug !== "string") continue
    const named = typeNamedIn(slug)
    const group = named === null ? null : members(named)
    if (group !== null) {
      for (const [member, beside] of group) {
        const outside = withheld || beside.uncommitted
        found.set(`${slugOf(slug)}.${member}`, { held: beside.held, uncommitted: outside })
      }
      continue
    }
    const fallback = held[FALLBACK] ?? held[FIXED]
    if (typeof fallback === "string") {
      found.set(slugOf(slug), { held: fallback, uncommitted: withheld })
    }
  }
  return { secret, uncommitted, besides: found }
}

type Raw = (slug: string) => Value | undefined

export function sidecarsIn(
  values: Iterable<Value>,
  among: ReadonlySet<string> = new Set([PAGE_TYPE])
): SidecarsBy {
  const raw = new Map<string, Value>()
  for (const value of values) {
    const said = typeIn(value)
    if (said === null || !among.has(said)) continue
    const slug = textAt(value, "slug")
    if (slug === null) continue
    raw.set(slug, value)
  }
  return sidecarsWith((slug) => raw.get(slug), raw.keys())
}

function sidecarsWith(rawOf: Raw, slugs: Iterable<string>): SidecarsBy {
  const aboveOf = (slug: string): readonly string[] => slugsIn(rawOf(slug)?.[EXTENDS])
  const grouped = new Map<string, boolean>()
  const grouping = (slug: string): boolean => {
    const done = grouped.get(slug)
    if (done !== undefined) return done
    grouped.set(slug, false)
    const said = slug === GROUP || aboveOf(slug).some((one) => grouping(one))
    grouped.set(slug, said)
    return said
  }
  const membered = new Map<string, ReadonlyMap<string, Beside>>()
  const members: Members = (slug) => {
    if (!grouping(slug)) return null
    const done = membered.get(slug)
    if (done !== undefined) return done
    const made = new Map<string, Beside>()
    membered.set(slug, made)
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const value = rawOf(here)
      if (value === undefined) continue
      for (const [key, beside] of declaredIn(value, noMembers).besides) {
        if (!made.has(key)) made.set(key, beside)
      }
      for (const up of [...aboveOf(here)].reverse()) waiting.push(up)
    }
    return made
  }
  const owned = new Map<string, Sidecars | undefined>()
  const ownOf = (slug: string): Sidecars | undefined => {
    if (owned.has(slug)) return owned.get(slug)
    const value = rawOf(slug)
    const made =
      value === undefined ? undefined : grouping(slug) ? NOTHING : declaredIn(value, members)
    owned.set(slug, made)
    return made
  }
  const found = new Map<string, Sidecars>()
  for (const slug of slugs) {
    if (rawOf(slug) === undefined) continue
    let secret = false
    let uncommitted = false
    const beside = new Map<string, Beside>()
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const held = ownOf(here)
      if (held?.secret === true) secret = true
      if (held?.uncommitted === true) uncommitted = true
      for (const [key, fallback] of held?.besides ?? []) {
        if (!beside.has(key)) beside.set(key, fallback)
      }
      for (const up of [...aboveOf(here)].reverse()) waiting.push(up)
    }
    found.set(slug, { secret, uncommitted, besides: beside })
  }
  return found
}

export function sidecarsOver(given: string | Reading, left: Iterable<Value>): SidecarsBy {
  const among = typeSlugsIn(given)
  return sidecarsIn([...typeValuesIn(given, among), ...left], among)
}

export function sidecarsOf(given: string | Reading, slugs: Iterable<string>): SidecarsBy {
  const reading = readingIn(given)
  const among = [...kindsUnder(PAGE_TYPE, reading)].sort()
  const held = new Map<string, Value | undefined>()
  const rawOf: Raw = (slug) => {
    if (held.has(slug)) return held.get(slug)
    let found: Value | undefined
    for (const kind of among) {
      for (const one of listedAt(reading, kind, slug)) {
        const value = valueByPath(reading, one.path)
        const said = value === null ? null : typeIn(value)
        if (value !== null && said !== null && among.includes(said)) found = value
      }
    }
    held.set(slug, found)
    return found
  }
  return sidecarsWith(rawOf, slugs)
}
