import {
  listedAt,
  readingIn,
  shapesEvery,
  shapesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading, Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { addressedIn, addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  textAt,
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  bodyOf,
  shapedIn,
  shapesFiledAt,
} from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const PAGE_TYPE = "page-type"

const LAID = new WeakMap<Reading, ReadonlyMap<string, Shape>>()

export function shapesLaidOn(reading: Reading, shapes: ReadonlyMap<string, Shape>): Reading {
  LAID.set(reading, shapes)
  return reading
}

export function shapesAt(given: string | Reading): ReadonlyMap<string, Shape> {
  if (typeof given === "string") return shapesEvery(given)
  return LAID.get(given) ?? shapesEvery(given)
}

function shapesUnder(reading: Reading, pageTypeSlug: string): ReadonlyMap<string, Shape> {
  const laid = LAID.get(reading)
  if (laid === undefined) return shapesOfType(reading, pageTypeSlug)
  const found = new Map<string, Shape>()
  for (const one of laid.values()) {
    if (one.pageTypeSlug === pageTypeSlug && !found.has(one.slug)) found.set(one.slug, one)
  }
  return found
}

type Moved = {
  readonly path: string
  readonly was: Value | null
  readonly now: Value | null
}

type Shaping2 = {
  readonly bodies: ReadonlyMap<string, string>
  readonly shapes: ReadonlyMap<string, Shape>
}

function pathsOver(reading: Reading, moved: readonly Moved[]): (kind: string) => string | null {
  const coming = new Map<string, string>()
  for (const one of moved) {
    if (one.now === null || typeIn(one.now) !== PAGE_TYPE) continue
    const slug = textAt(one.now, "slug")
    if (slug !== null) coming.set(slug, one.path)
  }
  return (kind) => {
    const at = coming.get(kind) ?? listedAt(reading, PAGE_TYPE, kind)[0]?.path ?? null
    return at === null ? null : shapesFiledAt(at)
  }
}

export function shapesAmong(
  held: readonly { readonly path: string; readonly value: Value }[]
): ReadonlyMap<string, string> {
  const typed = new Map<string, string>()
  const kinds = new Map<string, Shape[]>()
  for (const one of held) {
    if (typeIn(one.value) === PAGE_TYPE) {
      const slug = textAt(one.value, "slug")
      if (slug !== null) typed.set(slug, one.path)
    }
    const shape = shapedIn(one.value)
    if (shape === null) continue
    kinds.set(shape.pageTypeSlug, [...(kinds.get(shape.pageTypeSlug) ?? []), shape])
  }
  const found = new Map<string, string>()
  for (const [kind, shapes] of kinds) {
    const at = typed.get(kind)
    const beside = at === undefined ? null : shapesFiledAt(at)
    if (beside !== null) found.set(beside, bodyOf(shapes))
  }
  return found
}

export function shapesWritten(reading: Reading, moved: readonly Moved[]): Shaping2 {
  const pathOf = pathsOver(reading, moved)
  const touched = new Map<string, Map<string, Shape>>()
  const opened = (kind: string): Map<string, Shape> => {
    const found = touched.get(kind)
    if (found !== undefined) return found
    const made = new Map(shapesOfType(reading, kind))
    touched.set(kind, made)
    return made
  }
  for (const one of moved) {
    const was = one.was === null ? null : shapedIn(one.was)
    if (was !== null) opened(was.pageTypeSlug).delete(was.slug)
  }
  for (const one of moved) {
    const now = one.now === null ? null : shapedIn(one.now)
    if (now !== null) opened(now.pageTypeSlug).set(now.slug, now)
  }
  const bodies = new Map<string, string>()
  const shapes = new Map<string, Shape>(shapesAt(reading))
  for (const [kind, held] of touched) {
    const at = pathOf(kind)
    if (at !== null) bodies.set(at, bodyOf([...held.values()]))
    for (const named of [...shapes.keys()]) {
      if (named.startsWith(`${kind}/`)) shapes.delete(named)
    }
    for (const one of held.values()) shapes.set(`${kind}/${one.slug}`, one)
  }
  return { bodies, shapes }
}

type Shaping = { readonly shape: Shape } | { readonly refused: string }

function carriesNo(slug: string): string {
  return `no page property carries the slug \`${slug}\``
}

function among(slug: string, named: readonly string[]): string {
  return (
    `\`${slug}\` narrows to ${named.length} page properties and must name its page type — ` +
    [...named].sort().join(", ")
  )
}

function searchedIn(reading: Reading, slug: string): Shaping {
  const found: Shape[] = []
  const qualified: string[] = []
  for (const held of shapesAt(reading).values()) {
    if (held.slug !== slug) continue
    found.push(held)
    qualified.push(`${held.pageTypeSlug}/${slug}`)
  }
  const one = found[0]
  if (found.length === 1 && one !== undefined) return { shape: one }
  return { refused: found.length === 0 ? carriesNo(slug) : among(slug, qualified) }
}

function namedIn(reading: Reading, named: string): Shaping {
  const bare = addressIn(named)
  if (bare.kind === "bare") return searchedIn(reading, bare.slug)
  const address = addressedIn(named)
  if ("refused" in address) return { refused: address.refused }
  if ("id" in address) {
    return { refused: `\`${named}\` names a page by id, and a page property is named by its slug` }
  }
  const one = shapesUnder(reading, address.pageTypeSlug).get(address.value)
  return one === undefined ? { refused: carriesNo(address.value) } : { shape: one }
}

export function shapeOf(given: string | Reading, named: string): Shaping {
  return namedIn(readingIn(given), named)
}
