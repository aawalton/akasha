import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { filed } from "akasha/page/modules/file-body/page-file-body.module.code.ts"
import {
  besideAt,
  uncommittedBesideAt,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  partsOf,
  uncommittedPartsOf,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { z } from "zod"

const UNKNOWN = "so what the page carries there is unknown rather than nothing"

const ROW = z.record(z.string(), z.unknown())

export type Entried = {
  readonly key: string
  readonly propertySlug: string
  readonly pageTypeSlug: string
  readonly uncommitted: boolean
}

export type Rows = { readonly entries: readonly Value[] } | { readonly refused: string }

export type Entrying = (pageTypeSlug: string) => boolean

const entryShaped: Entrying = (pageTypeSlug) => pageTypeSlug === ENTRY_PROPERTY

export function entriedAmong<T extends Entried>(
  declared: Iterable<T>,
  entried: Entrying = entryShaped
): readonly T[] {
  const found: T[] = []
  for (const one of declared) {
    if (entried(one.pageTypeSlug)) found.push(one)
  }
  return found
}

export function entriesIn(at: string, text: string): Rows {
  const found: Value[] = []
  const lines = text.split("\n")
  for (let index = 0; index < lines.length; index += 1) {
    const said = (lines[index] ?? "").trim()
    if (said === "") continue
    let held: ReturnType<typeof ROW.safeParse>
    try {
      held = ROW.safeParse(JSON.parse(said))
    } catch {
      return { refused: `'${at}' holds no JSON on line ${index + 1}, ${UNKNOWN}` }
    }
    if (!held.success) {
      return { refused: `'${at}' holds no JSON object on line ${index + 1}, ${UNKNOWN}` }
    }
    found.push(held.data)
  }
  return { entries: found }
}

export function entriesAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  uncommitted = false
): Rows {
  const first = uncommitted
    ? uncommittedBesideAt(page, propertySlug, held)
    : besideAt(page, propertySlug, held)
  if (first === null) return { refused: `'${page}' is no page file, ${UNKNOWN}` }
  const there = (one: string): boolean => filed(root, one)
  if (!there(first)) {
    if (uncommitted) return { entries: [] }
    return { refused: `'${first}' is named by the page beside it and no file is there, ${UNKNOWN}` }
  }
  const found: Value[] = []
  const parts = uncommitted
    ? uncommittedPartsOf(page, propertySlug, held, there)
    : partsOf(page, propertySlug, held, there)
  for (const at of parts) {
    const read = entriesIn(at, readFileSync(join(root, at), "utf8"))
    if ("refused" in read) return read
    found.push(...read.entries)
  }
  return { entries: found }
}

export type Rowed = Entried & { readonly pagePropertySlug: string }

export type Rowing = {
  readonly slug: string
  readonly rows: readonly Value[]
}

export type Beside = (at: string) => string | null

export type Noting = (said: string) => undefined

export function rowsOver(
  page: string,
  value: Value,
  declared: Iterable<Rowed>,
  bodyAt: Beside,
  noting: Noting | null = null
): readonly Rowing[] {
  const found: Rowing[] = []
  const there = (at: string): boolean => bodyAt(at) !== null
  for (const one of entriedAmong(declared)) {
    const said = value[one.key]
    if (typeof said !== "string") continue
    const parts = one.uncommitted
      ? uncommittedPartsOf(page, one.propertySlug, said, there)
      : partsOf(page, one.propertySlug, said, there)
    const rows: Value[] = []
    for (const at of parts) {
      const body = bodyAt(at)
      if (body === null) {
        if (noting !== null)
          noting(`'${at}' is named beside '${page}' and would not open, ${UNKNOWN}`)
        continue
      }
      const read = entriesIn(at, body)
      if ("refused" in read) {
        if (noting !== null) noting(read.refused)
        continue
      }
      for (const row of read.entries) rows.push(row)
    }
    if (rows.length > 0) found.push({ slug: one.pagePropertySlug, rows })
  }
  return found
}

export type Fallback = { readonly held: string }

export function defaultedValue(
  root: string,
  page: string,
  value: Value,
  declared: Iterable<Rowed>,
  fallbacks: ReadonlyMap<string, Fallback>,
  entried: Entrying = entryShaped
): Value {
  const held: Record<string, unknown> = {}
  let turned = false
  for (const one of entriedAmong(declared, entried)) {
    const fallback = fallbacks.get(one.pagePropertySlug)
    if (fallback === undefined || value[one.key] !== undefined) continue
    const first = one.uncommitted
      ? uncommittedBesideAt(page, one.propertySlug, fallback.held)
      : besideAt(page, one.propertySlug, fallback.held)
    if (first === null || !filed(root, first)) continue
    held[one.key] = fallback.held
    turned = true
  }
  return turned ? { ...value, ...held } : value
}

export function entriedValue(
  root: string,
  page: string,
  value: Value,
  declared: Iterable<Entried>,
  wanted: ReadonlySet<string> | null = null,
  entried: Entrying = entryShaped
): Value {
  const held: Record<string, unknown> = {}
  let turned = false
  for (const one of entriedAmong(declared, entried)) {
    if (wanted !== null && !wanted.has(one.key)) continue
    const said = value[one.key]
    if (typeof said !== "string") continue
    const read = entriesAt(root, page, one.propertySlug, said, one.uncommitted)
    if ("refused" in read) throw new Error(read.refused)
    held[one.key] = read.entries
    turned = true
  }
  return turned ? { ...value, ...held } : value
}
