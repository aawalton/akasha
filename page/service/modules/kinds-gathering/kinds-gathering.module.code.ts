import { readFileSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import {
  ENTRY_PROPERTY,
  FILE_PROPERTY,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
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
  type Entrying,
  entriedValue,
} from "akasha/page/modules/entries/page-entries.module.code.ts"
import { filedValue } from "akasha/page/modules/file-body/page-file-body.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import { wholeValue } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
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

const BESIDE_THE_PAGE: ReadonlySet<string> = new Set([COMPUTED, FILE_PROPERTY])

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

export function carriedFor(given: string | Reading, pageTypeSlug: string): readonly Carried[] {
  const reading = readingIn(given)
  const body = schemaFiled(reading, pageTypeSlug)
  if (body === null) return propertiesFrom(pageTypeSlug, sourceFor(given))
  return carryingEach(body.split("\n")).map(carriedOf)
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
    found.push({
      slug: one.propertySlug,
      key: one.key,
      holds: page === undefined ? "" : (textAt(page.value, "holds") ?? ""),
      work: held,
    })
  }
  return found
}

export type Counting = {
  readonly row: Valued
  readonly computed: readonly Computed[]
}

export type Counted = {
  readonly rows: readonly Valued[]
  readonly dark: ReadonlyMap<string, string>
}

function reachingIn(
  root: string,
  own: ReadonlyMap<string, Subject>,
  named: ReadonlyMap<string, string>
): Reaching {
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
      found.push({ slug: textAt(subject.value, "slug") ?? listed.path, subject })
    }
    return found
  }

  return { subjectAt, namingAt }
}

export function computedOver(
  root: string,
  counting: readonly Counting[],
  taken: readonly Valued[]
): Counted {
  if (counting.every((one) => one.computed.length === 0)) {
    return { rows: taken, dark: new Map() }
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
  const computing = computingOver(reachingIn(root, subjects, named))
  const dark = new Map<string, string>()
  const rows = taken.map((one) => {
    const worked = computing.workedAt(one.path)
    if (worked === null) return one
    for (const [key, why] of worked.dark) if (!dark.has(key)) dark.set(key, why)
    return { path: one.path, value: worked.value as Value }
  })
  return { rows, dark }
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

function valuedFor(
  root: string,
  read: readonly Valued[],
  carried: readonly Carried[],
  files: readonly string[],
  entries: ReadonlySet<string> | null,
  testing: readonly Testing[],
  entrying: Entrying
): readonly Valued[] {
  const found: Valued[] = []
  for (const one of read) {
    const beside = wholeValue(root, one.path, one.value)
    if (!testing.every((test) => test(beside))) continue
    const entried = entriedValue(root, one.path, beside, carried, entries, entrying)
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
  for (const kind of kindsFor(reading, pageTypeSlug)) {
    const read = valuesOfType(reading, kind)
    if (read.length === 0) continue
    const own = kind === pageTypeSlug ? carried : carriedFor(reading, kind)
    const computed = computedFor(root, own)
    const testing = bodyTests(tests, own, entrying)
    for (const row of valuedFor(root, read, own, files, entries, testing, entrying)) {
      counting.push({ row, computed })
    }
  }
  return counting
}
