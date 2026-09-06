import { readFileSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { readingIn, type Valued, valuesOfType } from "@akasha/indexes"
import { workIn } from "@akasha/pages/calculation-loading"
import { type Computed, computingOver, type Subject } from "@akasha/pages/page-computing"
import { entriedValue } from "@akasha/pages/page-entries"
import { filedValue } from "@akasha/pages/page-file-body"
import { kindsUnder } from "@akasha/pages/page-type-descent"
import {
  type Carried,
  propertiesFrom,
  type Source,
  sourceAmong,
  sourceIn,
} from "@akasha/pages/page-type-properties"
import { wholeValue } from "@akasha/pages/page-uncommitted"
import { textAt, type Value } from "@akasha/pages/page-value"

const PAGE_TYPE = "page-type"

const COMPUTED = "computed-property"

const CODE = ".code.ts"

export type Named = Map<string, ReadonlyMap<string, Value>>

export function sourceFor(root: string): Source {
  return sourceAmong(
    valuesOfType(root, PAGE_TYPE).map((one) => one.value),
    sourceIn(root, () => null)
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

function codeAt(root: string, path: string): string | null {
  const beside = path.replace(/\.ts$/, CODE)
  const at = isAbsolute(beside) ? beside : join(root, beside)
  try {
    return readFileSync(at, "utf8")
  } catch {
    return null
  }
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
  for (const one of wanted) {
    const page = bySlug.get(one.pagePropertySlug)
    const body = page === undefined ? null : codeAt(root, page.path)
    const loaded =
      body === null
        ? { failed: `\`${one.pagePropertySlug}\` names no code file beside its page` }
        : workIn(body)
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

export function computedInto(counting: readonly Counting[]): Counted {
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
  const reached = (said: string): Subject | null => {
    const own = subjects.get(said)
    if (own !== undefined) return own
    const at = named.get(said)
    return at === undefined ? null : (subjects.get(at) ?? null)
  }
  const computing = computingOver({ subjectAt: reached })
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
