import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { ENTRY_PROPERTY } from "@akasha/indexes/entries"
import { besideAt } from "../file-name/page-file-name.module.code.ts"
import { partsOf } from "../file-parts/page-file-parts.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"

const UNKNOWN = "so what the page carries there is unknown rather than nothing"

export type Entried = {
  readonly key: string
  readonly propertySlug: string
  readonly pageTypeSlug: string
}

export type Rows = { readonly entries: readonly Value[] } | { readonly refused: string }

export function entriedAmong<T extends Entried>(declared: Iterable<T>): readonly T[] {
  const found: T[] = []
  for (const one of declared) {
    if (one.pageTypeSlug === ENTRY_PROPERTY) found.push(one)
  }
  return found
}

export function entriesIn(at: string, text: string): Rows {
  const found: Value[] = []
  const lines = text.split("\n")
  for (let index = 0; index < lines.length; index += 1) {
    const said = (lines[index] ?? "").trim()
    if (said === "") continue
    let held: unknown
    try {
      held = JSON.parse(said)
    } catch {
      return { refused: `'${at}' holds no JSON on line ${index + 1}, ${UNKNOWN}` }
    }
    if (held === null || typeof held !== "object" || Array.isArray(held)) {
      return { refused: `'${at}' holds no JSON object on line ${index + 1}, ${UNKNOWN}` }
    }
    found.push(held as Value)
  }
  return { entries: found }
}

function filed(root: string, at: string): boolean {
  const found = statSync(join(root, at), { throwIfNoEntry: false })
  return found?.isFile() === true
}

export function entriesAt(root: string, page: string, propertySlug: string, held: string): Rows {
  const first = besideAt(page, propertySlug, held)
  if (first === null) return { refused: `'${page}' is no page file, ${UNKNOWN}` }
  if (!filed(root, first)) {
    return { refused: `'${first}' is named by the page beside it and no file is there, ${UNKNOWN}` }
  }
  const found: Value[] = []
  for (const at of partsOf(page, propertySlug, held, (one) => filed(root, one))) {
    const read = entriesIn(at, readFileSync(join(root, at), "utf8"))
    if ("refused" in read) return read
    found.push(...read.entries)
  }
  return { entries: found }
}

export function entriedValue(
  root: string,
  page: string,
  value: Value,
  declared: Iterable<Entried>
): Value {
  const held: Record<string, unknown> = {}
  let turned = false
  for (const one of entriedAmong(declared)) {
    const said = value[one.key]
    if (typeof said !== "string") continue
    const read = entriesAt(root, page, one.propertySlug, said)
    if ("refused" in read) throw new Error(read.refused)
    held[one.key] = read.entries
    turned = true
  }
  return turned ? { ...value, ...held } : value
}
