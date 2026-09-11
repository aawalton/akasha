import { basename, dirname, join } from "node:path"
import { slugIn } from "akasha/pages/address/page-address.module.code.ts"
import {
  besideAt,
  pageOf,
  partedIn,
  sectionedIn,
} from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  everyOfType,
  filesIn,
  idsNaming,
  listedAt,
  listedById,
  readingIn,
  schemaOf,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { kindsUnder } from "akasha/pages/types/descent/page-type-descent.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const DECLARES = "page-property"

const EXTENDS = "extends-type"

const PAGE_TYPE = "page-type"

const RECORD_PROPERTY = "record-property"

const FILE_NAME = "fileName"

const FOLDER_NAME = "folderName"

const NAMED_FOLDER_PROPERTY = "named-folder-property"

const GENERATED = "generated"

const TOOL_RESOLVES_PATHS = "toolResolvesPaths"

const FILE_PROPERTY = "file-property"

const PROPERTY_SLUG = "propertySlug"

const WRITTEN_BY = "writtenBy"

const MODULE_PROPERTY_GROUP = "module-property-group"

const SLUG = "slug"

const GROUP_CODE = "code"

const HELD_TS = "ts"

const NO_SECTIONS: ReadonlyMap<string, string> = new Map()

export type Carrying = {
  readonly pageTypeSlug: string
  readonly path: string
  readonly id: string
  readonly within: string | null
}

export type Carried = { readonly carrying: readonly Carrying[] } | { readonly refused: string }

export type Declaring = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

export function declaringOf(given: string | Reading, id: string): readonly Declaring[] {
  const reading = readingIn(given)
  const found: Declaring[] = []
  for (const said of idsNaming(reading, id, DECLARES)) {
    const listed = listedById(reading, said)
    if (listed === null) continue
    const named = partedIn(listed.path)
    if (named === null || named.sections.length > 0) continue
    found.push({ slug: named.slug, kind: named.pageType, id: said, path: listed.path })
  }
  return found
}

function underneath(reading: Reading, id: string): readonly string[] {
  const found: string[] = []
  const walked = new Set<string>()
  const waiting = [id]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    if (walked.has(one)) continue
    walked.add(one)
    const listed = listedById(reading, one)
    if (listed === null) continue
    const named = partedIn(listed.path)
    if (named === null || named.sections.length > 0 || named.pageType !== PAGE_TYPE) continue
    found.push(named.slug)
    waiting.push(...idsNaming(reading, one, EXTENDS))
  }
  return found
}

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
  const filed = schemaOf(reading, named)
  if ("refused" in filed) return { refused: filed.refused }
  const slug = filed.schema.slug
  if (slug === null) return { refused: carriesNo(named) }
  const listed = listedAt(reading, filed.schema.pageTypeSlug, slug)[0]
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

export function heldUnder(
  path: string,
  naming: Iterable<Naming>,
  wanted: (value: Value) => boolean,
  carriedBy: (named: string) => Carried
): boolean {
  for (const one of naming) {
    const value = one.value
    if (value === null || !wanted(value)) continue
    const folder = value[FOLDER_NAME]
    if (typeof folder !== "string") continue
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const held = carriedBy(`${said.pageType}/${said.slug}`)
    if ("refused" in held) continue
    for (const two of held.carrying) {
      if (path.startsWith(`${join(dirname(two.path), folder)}/`)) return true
    }
  }
  return false
}

export function generates(value: Value): boolean {
  return value[GENERATED] === true
}

export function toolResolvesPaths(value: Value): boolean {
  return value[TOOL_RESOLVES_PATHS] === true
}

function kindedIn(given: string | Reading): Kinded {
  const held = new Map<string, Value>()
  const filling = (kind: string): undefined => {
    for (const one of valuesOfType(given, kind)) held.set(one.path, one.value)
  }
  filling(PAGE_TYPE)
  return {
    kindsUnder: (of) => kindsUnder(of, given, (path) => held.get(path) ?? null),
    everyOfType: (kind) => {
      filling(kind)
      return everyOfType(given, kind)
    },
    valueAt: (path) => held.get(path) ?? null,
  }
}

export function facingOn(given: string | Reading): Facing {
  return {
    ...kindedIn(given),
    carryingOf: (named) => carryingOf(given, named),
    filesIn: (folder) => filesIn(given, folder),
  }
}

export function generatedAt(given: string | Reading, path: string): boolean {
  try {
    return generatedIn(facingOn(given), path)
  } catch {
    return false
  }
}

export type Facing = Kinded & {
  readonly carryingOf: (named: string) => Carried
  readonly filesIn: (folder: string) => Iterable<string>
}

export type Derived = {
  readonly slugs: ReadonlySet<string>
  readonly resolving: ReadonlySet<string>
  readonly naming: readonly Naming[]
  readonly writers: ReadonlyMap<string, string>
  readonly sections: ReadonlyMap<string, string>
}

const DERIVED = new WeakMap<Facing, Derived>()

export function derivedFor(given: Facing): Derived {
  const found = DERIVED.get(given)
  if (found !== undefined) return found
  const naming = namingFor(given)
  const writers = writersIn(naming, given.carryingOf)
  const made: Derived = {
    slugs: slugsWhere(given, generates, given.carryingOf),
    resolving: slugsWhere(given, toolResolvesPaths, given.carryingOf),
    naming,
    writers,
    sections: writers.size === 0 ? NO_SECTIONS : sectionsOfGroups(given),
  }
  DERIVED.set(given, made)
  return made
}

export function generatedIn(given: Facing, path: string): boolean {
  try {
    const held = derivedFor(given)
    if (sectionHeld(path, held.slugs)) return true
    if (writtenIn(given, path, held)) return true
    return heldBeside(path, held.naming, generates, given.carryingOf)
  } catch {
    return false
  }
}

export function toolResolvesPathsIn(given: Facing, path: string): boolean {
  try {
    const held = derivedFor(given)
    if (sectionHeld(path, held.resolving)) return true
    return heldBeside(path, held.naming, toolResolvesPaths, given.carryingOf)
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
  carriedBy: (named: string) => Carried
): ReadonlySet<string> {
  const made = new Set<string>()
  for (const kind of given.kindsUnder(FILE_PROPERTY)) {
    for (const listed of given.everyOfType(kind)) {
      const value = given.valueAt(listed.path)
      if (value === null || !wanted(value)) continue
      if (typeof value[FILE_NAME] === "string") continue
      const slug = value[PROPERTY_SLUG]
      const said = partedIn(listed.path)
      if (typeof slug !== "string" || said === null || said.sections.length > 0) continue
      const held = carriedBy(`${said.pageType}/${said.slug}`)
      if ("refused" in held) continue
      for (const one of held.carrying) made.add(sectionKey(one.pageTypeSlug, slug))
    }
  }
  return made
}

export function writersIn(
  naming: Iterable<Naming>,
  carriedBy: (named: string) => Carried
): ReadonlyMap<string, string> {
  const made = new Map<string, string>()
  for (const one of naming) {
    const value = one.value
    if (value === null || typeof value[FILE_NAME] === "string") continue
    const named = value[WRITTEN_BY]
    const slug = value[PROPERTY_SLUG]
    if (typeof named !== "string" || typeof slug !== "string") continue
    const group = slugIn(named)
    const said = partedIn(one.path)
    if (group === null || said === null || said.sections.length > 0) continue
    const held = carriedBy(`${said.pageType}/${said.slug}`)
    if ("refused" in held) continue
    for (const two of held.carrying) made.set(sectionKey(two.pageTypeSlug, slug), group)
  }
  return made
}

export function sectionsOfGroups(given: Kinded): ReadonlyMap<string, string> {
  const made = new Map<string, string>()
  for (const listed of given.everyOfType(MODULE_PROPERTY_GROUP)) {
    const value = given.valueAt(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    const named = value[PROPERTY_SLUG]
    if (typeof slug !== "string" || typeof named !== "string") continue
    made.set(slug, named)
  }
  return made
}

export function writtenIn(given: Facing, path: string, held: Derived): boolean {
  const said = partedIn(path)
  if (said === null) return false
  const sectioned = sectionedIn(said)
  if (sectioned === null) return false
  const group = held.writers.get(sectionKey(said.pageType, sectioned.propertySlug))
  if (group === undefined) return false
  const section = held.sections.get(group)
  if (section === undefined) return false
  const folder = dirname(path)
  const beside = besideAt(
    join(folder, `${pageOf(said)}.${HELD_TS}`),
    `${section}.${GROUP_CODE}`,
    HELD_TS
  )
  if (beside === null) return false
  for (const one of given.filesIn(folder)) {
    if (one === beside) return true
  }
  return false
}

export function namingUnder(given: Kinded): readonly Naming[] {
  const found: Naming[] = []
  for (const kind of given.kindsUnder(FILE_PROPERTY)) {
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
  const made = namingUnder(given)
  NAMING.set(given, made)
  return made
}

export function foldersUnder(given: Kinded): readonly Naming[] {
  const found: Naming[] = []
  for (const kind of given.kindsUnder(NAMED_FOLDER_PROPERTY)) {
    for (const listed of given.everyOfType(kind)) {
      found.push({ path: listed.path, value: given.valueAt(listed.path) })
    }
  }
  return found
}

const FOLDERS = new WeakMap<Kinded, readonly Naming[]>()

export function foldersFor(given: Kinded): readonly Naming[] {
  const found = FOLDERS.get(given)
  if (found !== undefined) return found
  const made = foldersUnder(given)
  FOLDERS.set(given, made)
  return made
}

export function sectionHeld(path: string, slugs: ReadonlySet<string>): boolean {
  const said = partedIn(path)
  if (said === null) return false
  const held = sectionedIn(said)
  return held !== null && slugs.has(sectionKey(said.pageType, held.propertySlug))
}
