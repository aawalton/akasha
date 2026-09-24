import { existsSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import {
  declaringOf,
  typesCarrying,
  underneath,
} from "akasha/page/index/modules/property-declaring/property-declaring.module.code.ts"
import { shapeOf } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import {
  everyOfType,
  listedAt,
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  besideAt,
  pageOf,
  partedIn,
  sectionedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const PAGE_TYPE = "page-type"

const RECORD_PROPERTY = "record-property"

const FILE_NAME = "fileName"

const FOLDER_NAME = "folderName"

const NAMED_FOLDER_PROPERTY = "named-folder-property"

const GENERATED = "generated"

const FILE_PROPERTY = "file-property"

const PROPERTY_SLUG = "propertySlug"

const WRITTEN_BY = "writtenBy"

const MODULE_PROPERTY_GROUP = "module-property-group"

const SLUG = "slug"

const GROUP_CODE = "code"

const HELD_TS = "ts"

export type Carrying = {
  readonly pageTypeSlug: string
  readonly path: string
  readonly id: string
  readonly within: string | null
}

export type Carried = { readonly carrying: readonly Carrying[] } | { readonly refused: string }

function carriesNo(named: string): string {
  return `no page property carries the slug \`${named}\`, so which pages carry it could not be answered`
}

function ordered(found: readonly Carrying[]): readonly Carrying[] {
  return [...found].sort((one, two) => {
    const here = `${one.path} ${one.within ?? ""}`
    const there = `${two.path} ${two.within ?? ""}`
    return here < there ? -1 : here > there ? 1 : 0
  })
}

export function carryingOf(given: string | Reading, named: string): Carried {
  const reading = readingIn(given)
  const filed = shapeOf(reading, named)
  if ("refused" in filed) return { refused: filed.refused }
  const slug = filed.shape.slug
  if (slug === null) return { refused: carriesNo(named) }
  const listed = listedAt(reading, filed.shape.pageTypeSlug, slug)[0]
  if (listed === undefined) return { refused: carriesNo(named) }

  const found: Carrying[] = []
  const already = new Set<string>()
  const take = (id: string, within: string | null): undefined => {
    for (const held of declaringOf(reading, id)) {
      if (held.kind === RECORD_PROPERTY) {
        if (within === null) take(held.id, held.slug)
        continue
      }
      if (held.kind !== PAGE_TYPE) continue
      for (const kind of underneath(reading, held.id)) {
        for (const one of everyOfType(reading, kind)) {
          const key = `${one.path} ${within ?? ""}`
          if (already.has(key)) continue
          already.add(key)
          found.push({ pageTypeSlug: kind, path: one.path, id: one.id, within })
        }
      }
    }
  }
  take(listed.id, null)
  return { carrying: ordered(found) }
}

function typesIn(held: Carried): ReadonlySet<string> {
  const found = new Set<string>()
  if ("refused" in held) return found
  for (const one of held.carrying) found.add(one.pageTypeSlug)
  return found
}

export type Naming = {
  readonly path: string
  readonly value: Value | null
}

export function heldBeside(
  path: string,
  naming: Iterable<Naming>,
  wanted: (value: Value) => boolean,
  carriedBy: (named: string) => Carried
): boolean {
  const folder = dirname(path)
  const name = basename(path)
  for (const one of naming) {
    const value = one.value
    if (value === null || !wanted(value)) continue
    const named = value[FILE_NAME]
    if (typeof named !== "string" || named !== name) continue
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const held = carriedBy(`${said.pageType}/${said.slug}`)
    if ("refused" in held) continue
    if (held.carrying.some((two) => dirname(two.path) === folder)) return true
  }
  return false
}

const HERE = "."

function foldersNamed(
  naming: Iterable<Naming>,
  wanted: (value: Value) => boolean,
  carriedBy: (named: string) => Carried,
  name: string
): ReadonlySet<string> {
  const made = new Set<string>()
  for (const one of naming) {
    const value = one.value
    if (value === null || !wanted(value) || value[FOLDER_NAME] !== name) continue
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const held = carriedBy(`${said.pageType}/${said.slug}`)
    if ("refused" in held) continue
    for (const two of held.carrying) made.add(join(dirname(two.path), name))
  }
  return made
}

type Foldering = Map<(value: Value) => boolean, Map<string, ReadonlySet<string>>>

const NAMED_FOLDERS = new WeakMap<object, Foldering>()

function foldersNamedFor(
  naming: Iterable<Naming>,
  wanted: (value: Value) => boolean,
  carriedBy: (named: string) => Carried,
  name: string
): ReadonlySet<string> {
  let held = NAMED_FOLDERS.get(naming)
  if (held === undefined) {
    held = new Map()
    NAMED_FOLDERS.set(naming, held)
  }
  let each = held.get(wanted)
  if (each === undefined) {
    each = new Map()
    held.set(wanted, each)
  }
  const found = each.get(name)
  if (found !== undefined) return found
  const made = foldersNamed(naming, wanted, carriedBy, name)
  each.set(name, made)
  return made
}

export function heldUnder(
  path: string,
  naming: Iterable<Naming>,
  wanted: (value: Value) => boolean,
  carriedBy: (named: string) => Carried
): boolean {
  let at = dirname(path)
  let up = dirname(at)
  while (at !== up) {
    for (const name of [basename(at), HERE]) {
      if (foldersNamedFor(naming, wanted, carriedBy, name).has(at)) return true
    }
    at = up
    up = dirname(at)
  }
  return false
}

export function generates(value: Value): boolean {
  return value[GENERATED] === true
}

function kindedIn(given: string | Reading): Kinded {
  const held = new Map<string, Value>()
  const filling = (kind: string): undefined => {
    for (const one of valuesOfType(given, kind)) held.set(one.path, one.value)
  }
  return {
    kindsUnder: (of) => kindsUnder(of, given),
    everyOfType: (kind) => {
      filling(kind)
      return everyOfType(given, kind)
    },
    valueAt: (path) => held.get(path) ?? null,
  }
}

export function facingIn(root: string, given: string | Reading): Facing {
  const held = new Map<string, Carried>()
  const kinds = new Map<string, ReadonlySet<string>>()
  const made: Facing = {
    ...kindedIn(given),
    carryingOf: (named) => {
      const found = held.get(named)
      if (found !== undefined) return found
      const one = carryingOf(given, named)
      held.set(named, one)
      return one
    },
    typesCarrying: (named) => {
      const found = kinds.get(named)
      if (found !== undefined) return found
      const one = typesCarrying(given, named)
      kinds.set(named, one)
      return one
    },
    root,
  }
  return made
}

const FACING = new Map<string, Facing>()

export function facingOn(root: string): Facing {
  const found = FACING.get(root)
  if (found !== undefined) return found
  const made = facingIn(root, readingIn(root))
  FACING.set(root, made)
  return made
}

export function generatedAt(root: string, path: string): boolean {
  try {
    return generatedIn(facingOn(root), path)
  } catch {
    return false
  }
}

export type Facing = Kinded & {
  readonly carryingOf: (named: string) => Carried
  readonly typesCarrying?: (named: string) => ReadonlySet<string>
  readonly root: string
  readonly holds?: (path: string) => boolean
}

const BY_SLUG = new WeakMap<Kinded, Map<string, ReadonlyMap<string, readonly Naming[]>>>()

function namedBySlug(given: Kinded, under: string): ReadonlyMap<string, readonly Naming[]> {
  let held = BY_SLUG.get(given)
  if (held === undefined) {
    held = new Map()
    BY_SLUG.set(given, held)
  }
  const found = held.get(under)
  if (found !== undefined) return found
  const made = new Map<string, Naming[]>()
  for (const one of under === FILE_PROPERTY ? namingFor(given) : namingUnder(given, under)) {
    const slug = one.value === null ? null : one.value[PROPERTY_SLUG]
    if (typeof slug !== "string") continue
    const at = made.get(slug)
    if (at === undefined) made.set(slug, [one])
    else at.push(one)
  }
  held.set(under, made)
  return made
}

export function typesByOf(given: Facing): (named: string) => ReadonlySet<string> {
  return given.typesCarrying ?? ((named: string) => typesIn(given.carryingOf(named)))
}

function sectionSays(given: Facing, path: string, wanted: (value: Value) => boolean): boolean {
  const said = partedIn(path)
  if (said === null) return false
  const held = sectionedIn(said)
  if (held === null) return false
  const typesBy = typesByOf(given)
  for (const one of namedBySlug(given, FILE_PROPERTY).get(held.propertySlug) ?? []) {
    const value = one.value
    if (value === null || !wanted(value)) continue
    if (typeof value[FILE_NAME] === "string") continue
    const named = partedIn(one.path)
    if (named === null || named.sections.length > 0) continue
    if (typesBy(`${named.pageType}/${named.slug}`).has(said.pageType)) return true
  }
  return false
}

export function generatedIn(given: Facing, path: string): boolean {
  try {
    if (sectionSays(given, path, generates)) return true
    if (writerIn(given, path) !== null) return true
    if (heldBeside(path, namingFor(given), generates, given.carryingOf)) return true
    return heldUnder(path, foldersFor(given), generates, given.carryingOf)
  } catch {
    return false
  }
}

export type Kinded = {
  readonly kindsUnder: (of: string) => Iterable<string>
  readonly everyOfType: (kind: string) => Iterable<{ readonly path: string }>
  readonly valueAt: (path: string) => Value | null
}

function sectionKey(pageTypeSlug: string, propertySlug: string): string {
  return `${pageTypeSlug}/${propertySlug}`
}

export function slugsWhere(
  given: Kinded,
  wanted: (value: Value) => boolean,
  typesBy: (named: string) => ReadonlySet<string>,
  under: string = FILE_PROPERTY
): ReadonlySet<string> {
  const made = new Set<string>()
  for (const kind of given.kindsUnder(under)) {
    for (const listed of given.everyOfType(kind)) {
      const value = given.valueAt(listed.path)
      if (value === null || !wanted(value)) continue
      if (typeof value[FILE_NAME] === "string") continue
      const slug = value[PROPERTY_SLUG]
      const said = partedIn(listed.path)
      if (typeof slug !== "string" || said === null || said.sections.length > 0) continue
      const named = `${said.pageType}/${said.slug}`
      for (const one of typesBy(named)) made.add(sectionKey(one, slug))
    }
  }
  return made
}

function writerOf(given: Facing, pageTypeSlug: string, propertySlug: string): string | null {
  const typesBy = typesByOf(given)
  for (const one of namedBySlug(given, FILE_PROPERTY).get(propertySlug) ?? []) {
    const value = one.value
    if (value === null || typeof value[FILE_NAME] === "string") continue
    const named = value[WRITTEN_BY]
    if (typeof named !== "string") continue
    const group = slugIn(named)
    const said = partedIn(one.path)
    if (group === null || said === null || said.sections.length > 0) continue
    if (typesBy(`${said.pageType}/${said.slug}`).has(pageTypeSlug)) return group
  }
  return null
}

const GROUP_SECTIONS = new WeakMap<Kinded, ReadonlyMap<string, string>>()

function sectionsFor(given: Kinded): ReadonlyMap<string, string> {
  const found = GROUP_SECTIONS.get(given)
  if (found !== undefined) return found
  const made = new Map<string, string>()
  for (const listed of given.everyOfType(MODULE_PROPERTY_GROUP)) {
    const value = given.valueAt(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    const named = value[PROPERTY_SLUG]
    if (typeof slug !== "string" || typeof named !== "string") continue
    made.set(slug, named)
  }
  GROUP_SECTIONS.set(given, made)
  return made
}

function writerIn(given: Facing, path: string): string | null {
  const said = partedIn(path)
  if (said === null) return null
  const sectioned = sectionedIn(said)
  if (sectioned === null) return null
  const group = writerOf(given, said.pageType, sectioned.propertySlug)
  if (group === null) return null
  const section = sectionsFor(given).get(group)
  if (section === undefined) return null
  const folder = dirname(path)
  const beside = besideAt(
    join(folder, `${pageOf(said)}.${HELD_TS}`),
    `${section}.${GROUP_CODE}`,
    HELD_TS
  )
  if (beside === null) return null
  const holds = given.holds ?? ((at: string) => existsSync(join(given.root, at)))
  return holds(beside) ? beside : null
}

export function writerAt(given: Facing, path: string): string | null {
  try {
    return writerIn(given, path)
  } catch {
    return null
  }
}

function namingUnder(given: Kinded, under: string): readonly Naming[] {
  const found: Naming[] = []
  for (const kind of given.kindsUnder(under)) {
    for (const listed of given.everyOfType(kind)) {
      found.push({ path: listed.path, value: given.valueAt(listed.path) })
    }
  }
  return found
}

const NAMING = new WeakMap<Kinded, readonly Naming[]>()

export function namingFor(given: Kinded): readonly Naming[] {
  const found = NAMING.get(given)
  if (found !== undefined) return found
  const made = namingUnder(given, FILE_PROPERTY)
  NAMING.set(given, made)
  return made
}

const FOLDERS = new WeakMap<Kinded, readonly Naming[]>()

export function foldersFor(given: Kinded): readonly Naming[] {
  const found = FOLDERS.get(given)
  if (found !== undefined) return found
  const made = namingUnder(given, NAMED_FOLDER_PROPERTY)
  FOLDERS.set(given, made)
  return made
}

export function sectionHeld(path: string, slugs: ReadonlySet<string>): boolean {
  const said = partedIn(path)
  if (said === null) return false
  const held = sectionedIn(said)
  return held !== null && slugs.has(sectionKey(said.pageType, held.propertySlug))
}
