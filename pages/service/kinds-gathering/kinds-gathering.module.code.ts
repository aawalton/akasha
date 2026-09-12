import { readFileSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import {
  type TextOf,
  workIn,
} from "akasha/pages/calculation-loading/calculation-loading.module.code.ts"
import {
  type Computed,
  computingOver,
  type Named as Reached,
  type Source as Reaching,
  type Subject,
} from "akasha/pages/computing/page-computing.module.code.ts"
import { entriedValue } from "akasha/pages/entries/page-entries.module.code.ts"
import { filedValue } from "akasha/pages/file-body/page-file-body.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  idsNaming,
  listedAt,
  listedById,
  readingIn,
  type Valued,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  type Carried,
  propertiesFrom,
  type Source,
  sourceAmong,
  sourceIn,
} from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { kindsUnder } from "akasha/pages/types/descent/page-type-descent.module.code.ts"
import { wholeValue } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"

const COMPUTED = "computed-property"

const CODE = ".code.ts"

const SLASH = "/"

export type Named = Map<string, ReadonlyMap<string, Value>>

export function sourceFor(root: string): Source {
  const reading = readingIn(root)
  return sourceAmong(
    valuesOfType(reading, PAGE_TYPE).map((one) => one.value),
    sourceIn(reading, () => null)
  )
}

export function carriedFor(
  root: string,
  pageTypeSlug: string,
  source: Source = sourceFor(root)
): readonly Carried[] {
  return propertiesFrom(pageTypeSlug, source)
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

export function kindsFor(root: string, pageTypeSlug: string): readonly string[] {
  const pages = new Map<string, Value>()
  for (const one of valuesOfType(root, PAGE_TYPE)) pages.set(one.path, one.value)
  const under = kindsUnder(pageTypeSlug, readingIn(root), (path) => pages.get(path) ?? null)
  return [...under].sort()
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

export function computedFor(root: string, carried: readonly Carried[]): readonly Computed[] {
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
  let properties: Source | null = null

  const computedOf = (pageTypeSlug: string): readonly Computed[] => {
    const already = carried.get(pageTypeSlug)
    if (already !== undefined) return already
    properties ??= sourceFor(root)
    const found = computedFor(root, carriedFor(root, pageTypeSlug, properties))
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

export function computedInto(root: string, counting: readonly Counting[]): Counted {
  if (counting.every((one) => one.computed.length === 0)) {
    return { rows: counting.map((one) => one.row), dark: new Map() }
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
  const rows = counting.map((one) => {
    const worked = computing.workedAt(one.row.path)
    if (worked === null) return one.row
    for (const [key, why] of worked.dark) if (!dark.has(key)) dark.set(key, why)
    return { path: one.row.path, value: worked.value as Value }
  })
  return { rows, dark }
}

function valuedFor(
  root: string,
  read: readonly Valued[],
  carried: readonly Carried[],
  files: readonly string[]
): readonly Valued[] {
  return read.map((one) => {
    const beside = wholeValue(root, one.path, one.value)
    const entried = entriedValue(root, one.path, beside, carried)
    const whole = filedValue(root, one.path, entried, carried, files)
    return whole === one.value ? one : { path: one.path, value: whole }
  })
}

export function gatheredFor(
  root: string,
  pageTypeSlug: string,
  carried: readonly Carried[],
  files: readonly string[] = []
): readonly Counting[] {
  const source = sourceFor(root)
  const counting: Counting[] = []
  for (const kind of kindsFor(root, pageTypeSlug)) {
    const read = valuesOfType(root, kind)
    if (read.length === 0) continue
    const own = kind === pageTypeSlug ? carried : carriedFor(root, kind, source)
    const computed = computedFor(root, own)
    for (const row of valuedFor(root, read, own, files)) counting.push({ row, computed })
  }
  return counting
}
