import { closeSync, openSync, readdirSync, readFileSync, readSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import type { Filed } from "akasha/page/computed-property/computed-property.page-type.ts"
import {
  type Beside,
  sidecarsOver,
} from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
import {
  ENTRY_PROPERTY,
  FILE_PROPERTY,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  heldOnce,
  listedAt,
  listedById,
  readingIn,
  type Valued,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  type TextOf,
  workIn,
} from "akasha/page/modules/calculation-loading/calculation-loading.module.code.ts"
import {
  type Computed,
  computingOver,
  type Named as Reached,
  type Source as Reaching,
  type Subject,
} from "akasha/page/modules/computing/page-computing.module.code.ts"
import {
  defaultedValue,
  type Entrying,
  entriedValue,
} from "akasha/page/modules/entries/page-entries.module.code.ts"
import { filedValue } from "akasha/page/modules/file-body/page-file-body.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import { wholeValue } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Carried,
  propertiesFrom,
  type Source,
  sourceAmong,
  sourceIn,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import {
  carriedOf,
  carryingEach,
  schemaAt,
} from "akasha/page/type/modules/type-schema/type-schema.module.code.ts"

const PAGE_TYPE = "page-type"

export const COMPUTED = "computed-property"

const CODE = ".code.ts"

const SLASH = "/"

const TARGET_PAGE_TYPE = "targetPageType"

const ASKED_BY_NAME = "askedByName"

const BESIDE_THE_PAGE: ReadonlySet<string> = new Set([COMPUTED, FILE_PROPERTY])

type Read = {
  readonly files: ReadonlySet<string>
  readonly folders: ReadonlySet<string>
}

export type Reads = ReadonlyMap<string, Read>

const placedAt = new WeakMap<Computed, string>()

export type Testing = (value: Value) => boolean

export type Named = Map<string, ReadonlyMap<string, Value>>

function sourceFor(given: string | Reading): Source {
  const reading = readingIn(given)
  return sourceAmong(
    valuesOfType(reading, PAGE_TYPE).map((one) => one.value),
    sourceIn(reading, () => null)
  )
}

function schemaFiled(reading: Reading, pageTypeSlug: string): string | null {
  const listed = listedAt(reading, PAGE_TYPE, pageTypeSlug)
  const one = listed.length === 1 ? listed[0] : undefined
  if (one === undefined) return null
  const at = schemaAt(one.path)
  return at === null ? null : reading.read(at)
}

export function carriedBeside(
  given: string | Reading,
  pageTypeSlug: string
): readonly Carried[] | null {
  const body = schemaFiled(readingIn(given), pageTypeSlug)
  return body === null ? null : carryingEach(body.split("\n")).map(carriedOf)
}

export function carriedFor(given: string | Reading, pageTypeSlug: string): readonly Carried[] {
  return carriedBeside(given, pageTypeSlug) ?? propertiesFrom(pageTypeSlug, sourceFor(given))
}

export function pagesOfType(
  root: string,
  named: Named,
  pageTypeSlug: string
): ReadonlyMap<string, Value> {
  const found = named.get(pageTypeSlug)
  if (found !== undefined) return found
  const made = new Map<string, Value>()
  for (const one of valuesOfType(root, pageTypeSlug)) {
    const slug = textAt(one.value, "slug")
    if (slug !== null && !made.has(slug)) made.set(slug, one.value)
  }
  named.set(pageTypeSlug, made)
  return made
}

export function kindsFor(given: string | Reading, pageTypeSlug: string): readonly string[] {
  return [...kindsUnder(pageTypeSlug, readingIn(given))].sort()
}

function textOver(root: string): TextOf {
  return (path) => {
    const at = isAbsolute(path) ? path : join(root, path)
    try {
      return readFileSync(at, "utf8")
    } catch {
      return null
    }
  }
}

function codeAt(path: string): string {
  return path.replace(/\.ts$/, CODE)
}

function computedFor(root: string, carried: readonly Carried[]): readonly Computed[] {
  const wanted = carried.filter((one) => one.pageTypeSlug === COMPUTED)
  if (wanted.length === 0) return []
  const bySlug = new Map<string, Valued>()
  for (const one of valuesOfType(root, COMPUTED)) {
    const slug = textAt(one.value, "slug")
    if (slug !== null && !bySlug.has(slug)) bySlug.set(slug, one)
  }
  const found: Computed[] = []
  const textOf = textOver(root)
  for (const one of wanted) {
    const page = bySlug.get(one.pagePropertySlug)
    const at = page === undefined ? null : codeAt(page.path)
    const body = at === null ? null : textOf(at)
    const loaded =
      at === null || body === null
        ? { failed: `\`${one.pagePropertySlug}\` names no code file beside its page` }
        : workIn(body, at, textOf)
    const held =
      "failed" in loaded
        ? () => {
            throw new Error(loaded.failed)
          }
        : loaded.work
    const reached = page === undefined ? null : slugAt(page.value, TARGET_PAGE_TYPE)
    const made: Computed = {
      slug: one.propertySlug,
      key: one.key,
      holds: page === undefined ? "" : (textAt(page.value, "holds") ?? ""),
      ...(reached === null ? {} : { reaches: { slug: reached, kinds: kindsUnder(reached, root) } }),
      ...(page?.value[ASKED_BY_NAME] === true ? { askedByName: true } : {}),
      work: held,
    }
    if (page !== undefined) placedAt.set(made, page.path)
    found.push(made)
  }
  return found
}

export type Counting = {
  readonly row: Valued
  readonly computed: readonly Computed[]
}

type Counted = {
  readonly rows: readonly Valued[]
  readonly dark: ReadonlyMap<string, string>
  readonly read: Reads
}

type Placing = Reaching & { readonly pathAt: (said: string) => string | null }

function reachingIn(
  root: string,
  own: ReadonlyMap<string, Subject>,
  named: ReadonlyMap<string, string>
): Placing {
  const reading = readingIn(root)
  const carried = new Map<string, readonly Computed[]>()
  const valued = new Map<string, ReadonlyMap<string, Value>>()
  const made = new Map<string, Subject | null>()

  const computedOf = (pageTypeSlug: string): readonly Computed[] => {
    const already = carried.get(pageTypeSlug)
    if (already !== undefined) return already
    const found = computedFor(root, carriedFor(reading, pageTypeSlug))
    carried.set(pageTypeSlug, found)
    return found
  }

  const valuesOf = (pageTypeSlug: string): ReadonlyMap<string, Value> => {
    const already = valued.get(pageTypeSlug)
    if (already !== undefined) return already
    const found = new Map<string, Value>()
    for (const one of valuesOfType(reading, pageTypeSlug)) found.set(one.path, one.value)
    valued.set(pageTypeSlug, found)
    return found
  }

  const filed = (path: string): Subject | null => {
    const here = own.get(path)
    if (here !== undefined) return here
    const already = made.get(path)
    if (already !== undefined) return already
    const parted = partedIn(path)
    const value = parted === null ? undefined : valuesOf(parted.pageType).get(path)
    const subject =
      parted === null || value === undefined
        ? null
        : { id: textAt(value, "id") ?? path, value, computed: computedOf(parted.pageType) }
    made.set(path, subject)
    return subject
  }

  const subjectAt = (said: string): Subject | null => {
    const here = own.get(said)
    if (here !== undefined) return here
    const at = named.get(said)
    if (at !== undefined) return own.get(at) ?? null
    const cut = said.indexOf(SLASH)
    if (cut === -1) return null
    const listed = listedAt(reading, said.slice(0, cut), said.slice(cut + 1))
    const one = listed.length === 1 ? listed[0] : undefined
    return one === undefined ? null : filed(one.path)
  }

  const namingAt = (id: string, propertySlug: string): readonly Reached[] => {
    const found: Reached[] = []
    for (const naming of idsNaming(reading, id, propertySlug)) {
      const listed = listedById(reading, naming)
      if (listed === null) continue
      const subject = filed(listed.path)
      if (subject === null) continue
      found.push({ slug: listed.path, subject })
    }
    return found
  }

  const pathAt = (said: string): string | null => {
    if (own.has(said)) return said
    const at = named.get(said)
    if (at !== undefined) return at
    if (partedIn(said) !== null) return said
    const cut = said.indexOf(SLASH)
    if (cut === -1) return null
    const listed = listedAt(reading, said.slice(0, cut), said.slice(cut + 1))
    return listed.length === 1 ? (listed[0]?.path ?? null) : null
  }

  return { subjectAt, namingAt, fileAt: fileOver(root), folderAt: folderOver(root), pathAt }
}

function folderOver(root: string): (path: string) => readonly string[] | null {
  return (path) => {
    const at = isAbsolute(path) ? path : join(root, path)
    try {
      return readdirSync(at).sort()
    } catch {
      return null
    }
  }
}

function runOf(at: string, from: number, upTo: number): Uint8Array {
  const length = Math.max(0, upTo - from)
  const into = new Uint8Array(length)
  if (length === 0) return into
  const held = openSync(at, "r")
  try {
    return into.subarray(0, readSync(held, into, 0, length, from))
  } finally {
    closeSync(held)
  }
}

function fileOver(root: string): (path: string) => Filed | null {
  return (path) => {
    const at = isAbsolute(path) ? path : join(root, path)
    const found = statSync(at, { throwIfNoEntry: false })
    if (found === undefined || !found.isFile()) return null
    return { size: found.size, read: (from, upTo) => runOf(at, from, upTo) }
  }
}

export function computedOver(
  root: string,
  counting: readonly Counting[],
  taken: readonly Valued[]
): Counted {
  if (counting.every((one) => one.computed.length === 0)) {
    return { rows: taken, dark: new Map(), read: new Map() }
  }
  const subjects = new Map<string, Subject>()
  const named = new Map<string, string>()
  for (const one of counting) {
    subjects.set(one.row.path, {
      id: textAt(one.row.value, "id") ?? one.row.path,
      value: one.row.value,
      computed: one.computed,
    })
    const slug = textAt(one.row.value, "slug")
    if (slug !== null && !named.has(slug)) named.set(slug, one.row.path)
  }
  const placing = reachingIn(root, subjects, named)
  const computing = computingOver(placing)
  const computedAt = new Map(counting.map((one) => [one.row.path, one.computed]))
  const dark = new Map<string, string>()
  const read = new Map<string, { readonly files: Set<string>; readonly folders: Set<string> }>()
  const rows = taken.map((one) => {
    const worked = computing.workedAt(one.path)
    if (worked === null) return one
    for (const [key, why] of worked.dark) if (!dark.has(key)) dark.set(key, why)
    for (const property of computedAt.get(one.path) ?? []) {
      const at = placedAt.get(property)
      const reading = worked.read.get(property.key)
      if (at === undefined || reading === undefined) continue
      const into = read.get(at) ?? { files: new Set<string>(), folders: new Set<string>() }
      read.set(at, into)
      for (const said of reading.pages) {
        const path = placing.pathAt(said)
        if (path !== null) into.files.add(path)
      }
      for (const file of reading.files) into.files.add(file)
      for (const folder of reading.folders) into.folders.add(folder)
    }
    return { path: one.path, value: worked.value as Value }
  })
  return { rows, dark, read }
}

export function computedInto(root: string, counting: readonly Counting[]): Counted {
  return computedOver(
    root,
    counting,
    counting.map((one) => one.row)
  )
}

function bodyTests(
  tests: ReadonlyMap<string, Testing> | null,
  carried: readonly Carried[],
  entrying: Entrying
): readonly Testing[] {
  if (tests === null) return []
  const beside = new Set<string>()
  for (const one of carried) {
    if (BESIDE_THE_PAGE.has(one.pageTypeSlug) || entrying(one.pageTypeSlug)) beside.add(one.key)
  }
  const found: Testing[] = []
  for (const [key, test] of tests) if (!beside.has(key)) found.push(test)
  return found
}

const NO_FALLBACKS: ReadonlyMap<string, Beside> = new Map()

const sidecarsHeld = heldOnce((reading) => sidecarsOver(reading, []))

type Gathering = {
  readonly carried: readonly Carried[]
  readonly fallbacks: ReadonlyMap<string, Beside>
  readonly files: readonly string[]
  readonly entries: ReadonlySet<string> | null
  readonly testing: readonly Testing[]
  readonly entrying: Entrying
}

function valuedFor(root: string, read: readonly Valued[], given: Gathering): readonly Valued[] {
  const { carried, files, entries, testing, entrying } = given
  const found: Valued[] = []
  for (const one of read) {
    const beside = wholeValue(root, one.path, one.value)
    if (!testing.every((test) => test(beside))) continue
    const stated = defaultedValue(root, one.path, beside, carried, given.fallbacks, entrying)
    const entried = entriedValue(root, one.path, stated, carried, entries, entrying)
    const whole = filedValue(root, one.path, entried, carried, files)
    found.push(whole === one.value ? one : { path: one.path, value: whole })
  }
  return found
}

export function gatheredFor(
  root: string,
  pageTypeSlug: string,
  carried: readonly Carried[],
  files: readonly string[] = [],
  reading: Reading = readingIn(root),
  entries: ReadonlySet<string> | null = null,
  tests: ReadonlyMap<string, Testing> | null = null
): readonly Counting[] {
  const counting: Counting[] = []
  const under = kindsUnder(ENTRY_PROPERTY, reading)
  const entrying: Entrying = (slug) => under.has(slug)
  const sidecars = sidecarsHeld(reading)
  for (const kind of kindsFor(reading, pageTypeSlug)) {
    const read = valuesOfType(reading, kind)
    if (read.length === 0) continue
    const own = kind === pageTypeSlug ? carried : carriedFor(reading, kind)
    const computed = computedFor(root, own)
    const testing = bodyTests(tests, own, entrying)
    const fallbacks = sidecars.get(kind)?.besides ?? NO_FALLBACKS
    const gathering = { carried: own, fallbacks, files, entries, testing, entrying }
    for (const row of valuedFor(root, read, gathering)) {
      counting.push({ row, computed })
    }
  }
  return counting
}
