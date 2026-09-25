import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  partAt,
  uncommittedPartAt,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const NEWLINE = "\n"

export type Part = {
  readonly path: string
  readonly text: string
}

type Texts = { readonly texts: readonly string[] } | { readonly refused: string }

export type Parts = { readonly parts: readonly Part[] } | { readonly refused: string }

export function lineFor(value: Value): string {
  return `${JSON.stringify(value)}${NEWLINE}`
}

export function* linesOver(values: Iterable<Value>): Iterable<string> {
  for (const one of values) yield lineFor(one)
}

export function oversized(size: number, ceiling: number, at: string | null): string {
  const bound = at === null ? "" : ` bound for '${at}'`
  return `one value${bound} runs to ${size} bytes, over the ceiling of ${ceiling}, and no value is divided`
}

export function textsOverLines(
  lines: Iterable<string>,
  ceiling: number,
  at: string | null = null
): Texts {
  const coder = new TextEncoder()
  const texts: string[] = []
  let held = ""
  let filled = 0
  for (const line of lines) {
    const size = coder.encode(line).length
    if (size > ceiling) return { refused: oversized(size, ceiling, at) }
    if (filled > 0 && filled + size > ceiling) {
      texts.push(held)
      held = ""
      filled = 0
    }
    held += line
    filled += size
  }
  texts.push(held)
  return { texts }
}

export function partsOverLines(
  page: string,
  propertySlug: string,
  held: string,
  lines: Iterable<string>,
  ceiling: number,
  uncommitted = false
): Parts {
  const first = uncommitted
    ? uncommittedPartAt(page, propertySlug, held, FIRST_PART)
    : partAt(page, propertySlug, held, FIRST_PART)
  const made = textsOverLines(lines, ceiling, first)
  if ("refused" in made) return made
  const parts: Part[] = []
  for (let index = 0; index < made.texts.length; index += 1) {
    const part = FIRST_PART + index
    const at = uncommitted
      ? uncommittedPartAt(page, propertySlug, held, part)
      : partAt(page, propertySlug, held, part)
    if (at === null) {
      return {
        refused: `'${page}' is no page file, so the files its \`${propertySlug}\` lands in have no name`,
      }
    }
    parts.push({ path: at, text: made.texts[index] ?? "" })
  }
  return { parts }
}

export function partsOver(
  page: string,
  propertySlug: string,
  held: string,
  values: Iterable<Value>,
  ceiling: number,
  uncommitted = false
): Parts {
  return partsOverLines(page, propertySlug, held, linesOver(values), ceiling, uncommitted)
}

type Owned = { readonly key: string; readonly writtenBy?: string }

export function writerRefused(one: Owned): string | null {
  const writer = one.writtenBy
  if (writer === undefined) return null
  return `\`${one.key}\` has its rows written by \`${writer}\` alone, so no other writer writes them; hand those rows to \`${writer}\``
}

export function rowsRefused(one: Owned, value: unknown): string | null {
  return Array.isArray(value) ? writerRefused(one) : null
}
