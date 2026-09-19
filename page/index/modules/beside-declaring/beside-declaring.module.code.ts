import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  slugOf,
  slugsIn,
  textAt,
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
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

export type Sidecars = {
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

export function sidecarsIn(
  values: Iterable<Value>,
  among: ReadonlySet<string> = new Set([PAGE_TYPE])
): SidecarsBy {
  const raw = new Map<string, Value>()
  const above = new Map<string, readonly string[]>()
  for (const value of values) {
    const said = typeIn(value)
    if (said === null || !among.has(said)) continue
    const slug = textAt(value, "slug")
    if (slug === null) continue
    raw.set(slug, value)
    const extended = slugsIn(value[EXTENDS])
    if (extended.length > 0) above.set(slug, extended)
  }
  const grouped = new Map<string, boolean>()
  const grouping = (slug: string): boolean => {
    const done = grouped.get(slug)
    if (done !== undefined) return done
    grouped.set(slug, false)
    const said = slug === GROUP || (above.get(slug) ?? []).some((one) => grouping(one))
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
      const value = raw.get(here)
      if (value === undefined) continue
      for (const [key, beside] of declaredIn(value, noMembers).besides) {
        if (!made.has(key)) made.set(key, beside)
      }
      for (const up of [...(above.get(here) ?? [])].reverse()) waiting.push(up)
    }
    return made
  }
  const own = new Map<string, Sidecars>()
  for (const [slug, value] of raw) {
    own.set(slug, grouping(slug) ? NOTHING : declaredIn(value, members))
  }
  const found = new Map<string, Sidecars>()
  for (const slug of own.keys()) {
    let secret = false
    let uncommitted = false
    const beside = new Map<string, Beside>()
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const held = own.get(here)
      if (held?.secret === true) secret = true
      if (held?.uncommitted === true) uncommitted = true
      for (const [key, fallback] of held?.besides ?? []) {
        if (!beside.has(key)) beside.set(key, fallback)
      }
      for (const up of [...(above.get(here) ?? [])].reverse()) waiting.push(up)
    }
    found.set(slug, { secret, uncommitted, besides: beside })
  }
  return found
}

export function sidecarsOver(given: string | Reading, left: Iterable<Value>): SidecarsBy {
  const among = typeSlugsIn(given)
  return sidecarsIn([...typeValuesIn(given, among), ...left], among)
}
