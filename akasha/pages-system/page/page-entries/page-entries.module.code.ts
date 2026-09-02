import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { ENTRY_PROPERTY } from "@akasha/indexes/entries"
import { besideAt } from "../page-file-name/page-file-name.module.code.ts"
import type { Value } from "../page-value/page-value.module.code.ts"

const UNKNOWN = "so what the page carries there is unknown rather than nothing"

export type Entried = {
  readonly key: string
  readonly propertySlug: string
  readonly pageTypeSlug: string
}

export type Rows = { readonly entries: readonly Value[] } | { readonly refused: string }

export function entriedAmong(declared: Iterable<Entried>): readonly Entried[] {
  const found: Entried[] = []
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

export function entriesAt(root: string, page: string, propertySlug: string, held: string): Rows {
  const at = besideAt(page, propertySlug, held)
  if (at === null) return { refused: `'${page}' is no page file, ${UNKNOWN}` }
  const full = join(root, at)
  const found = statSync(full, { throwIfNoEntry: false })
  if (found === undefined || !found.isFile()) {
    return { refused: `'${at}' is named by the page beside it and no file is there, ${UNKNOWN}` }
  }
  return entriesIn(at, readFileSync(full, "utf8"))
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
