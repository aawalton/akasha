import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { type Parted, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  headOf,
  type Keying,
  listedBy,
  viewKeying,
  viewKinds,
} from "akasha/page/view/modules/key-naming/key-naming.module.code.ts"
import { viewPageType } from "akasha/page/view/properties/view-page-type.relation-property.ts"

export type Viewing = {
  readonly path: string
  readonly value: Value
}

export type Naming = {
  readonly key: string
  readonly at: string
}

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const LISTS = viewPageType.slug

const NO_KINDS: ReadonlySet<string> = new Set()

type Kinding = {
  readonly views: ReadonlySet<string>
  readonly properties: ReadonlySet<string>
}

const KINDING = new WeakMap<Answering, Kinding>()

function kindingIn(index: Answering): Kinding {
  const found = KINDING.get(index)
  if (found !== undefined) return found
  const made = { views: viewKinds(index), properties: index.kindsUnder(PAGE_PROPERTY) }
  KINDING.set(index, made)
  return made
}

function viewingAt(shadow: Shadow, paths: Iterable<string>): readonly Viewing[] {
  const found: Viewing[] = []
  for (const path of [...new Set(paths)].sort()) {
    const value = shadow.pageOf(path)
    if (value !== null) found.push({ path, value })
  }
  return found
}

export function viewsIn(shadow: Shadow): readonly Viewing[] {
  const found: string[] = []
  for (const kind of kindingIn(shadow.index).views) {
    for (const one of shadow.index.everyOfType(kind)) found.push(one.path)
  }
  return viewingAt(shadow, found)
}

function kindsMoved(index: Answering, said: Parted): ReadonlySet<string> | null {
  if (said.pageType === PAGE_TYPE) return index.kindsUnder(said.slug)
  if (!kindingIn(index).properties.has(said.pageType)) return null
  return index.typesCarrying(`${said.pageType}/${said.slug}`)
}

function listingKind(index: Answering, kind: string, found: Set<string>): undefined {
  const views = kindingIn(index).views
  if (views.has(kind)) {
    for (const one of index.everyOfType(kind)) found.add(one.path)
  }
  for (const listed of index.listedAt(PAGE_TYPE, kind)) {
    for (const one of index.namersAt(listed.path)) {
      if (one.propertySlug !== LISTS) continue
      if (views.has(partedIn(one.path)?.pageType ?? "")) found.add(one.path)
    }
  }
}

function reachedBy(
  change: Change,
  shadow: Shadow,
  path: string,
  said: Parted,
  found: Set<string>
): undefined {
  const now = kindsMoved(shadow.index, said)
  if (now === null) return
  const stale = now.size === 0 && change.after(path) === null
  const index = stale ? shadow.before() : shadow.index
  const kinds = stale ? (kindsMoved(index, said) ?? NO_KINDS) : now
  for (const kind of kinds) listingKind(index, kind, found)
}

export function viewsReachedBy(change: Change, shadow: Shadow): readonly Viewing[] {
  const views = kindingIn(shadow.index).views
  const found = new Set<string>()
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null || said.sections.length > 0) continue
    if (views.has(said.pageType)) found.add(path)
    reachedBy(change, shadow, path, said, found)
  }
  return viewingAt(shadow, found)
}

function recordIn(held: unknown): Value | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Value
}

function namingsAt(key: string, held: unknown, found: Naming[]): undefined {
  if (typeof held === "string") {
    found.push({ key: held, at: key })
    return
  }
  if (!Array.isArray(held)) return
  held.forEach((each, at) => {
    if (typeof each === "string") found.push({ key: each, at: `${key}[${at}]` })
  })
}

function namingsWithin(key: string, within: string, held: unknown, found: Naming[]): undefined {
  if (!Array.isArray(held)) return
  held.forEach((each, at) => {
    const record = recordIn(each)
    const said = record === null ? undefined : record[within]
    if (typeof said === "string") found.push({ key: said, at: `${key}[${at}].${within}` })
  })
}

export function namingsIn(value: Value, keying: readonly Keying[]): readonly Naming[] {
  const found: Naming[] = []
  for (const one of keying) {
    const within = one.within
    const held = value[one.key]
    if (within === null) namingsAt(one.key, held, found)
    else namingsWithin(one.key, within, held, found)
  }
  return found
}

function keysOf(shadow: Shadow, pageTypeSlug: string): ReadonlySet<string> | null {
  const carried = shadow.index.propertiesIfNamed(pageTypeSlug)
  return carried === null ? null : new Set(carried.map((one) => one.propertySlug))
}

function undeclared(at: string, key: string, listed: string, keys: ReadonlySet<string>): string {
  return (
    `names \`${key}\` at \`${at}\`, and the \`${listed}\` page type declares no such key` +
    ` — the keys are ${[...keys].sort().join(", ")}`
  )
}

export function refusalsOver(held: readonly Viewing[], shadow: Shadow): readonly Judged[] {
  const keying = viewKeying(shadow.index)
  if (keying.length === 0) return []
  const known = new Map<string, ReadonlySet<string> | null>()
  const said: Judged[] = []
  for (const one of held) {
    const listed = listedBy(one.value)
    if (listed === null) continue
    if (!known.has(listed)) known.set(listed, keysOf(shadow, listed))
    const keys = known.get(listed) ?? null
    if (keys === null) continue
    for (const naming of namingsIn(one.value, keying)) {
      const key = headOf(naming.key)
      if (keys.has(key)) continue
      said.push({ path: one.path, reason: undeclared(naming.at, key, listed, keys) })
    }
  }
  return said
}
