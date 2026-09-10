import { FIRST_PART } from "../file-name/page-file-name.module.code.ts"
import { partAt, uncommittedPartAt } from "../file-parts/page-file-parts.module.code.ts"
import type { Value } from "../value-reading/page-value-reading.module.code.ts"

const NEWLINE = "\n"

export type Part = {
  readonly path: string
  readonly text: string
}

export type Texts = { readonly texts: readonly string[] } | { readonly refused: string }

export type Parts = { readonly parts: readonly Part[] } | { readonly refused: string }

export function lineFor(value: Value): string {
  return `${JSON.stringify(value)}${NEWLINE}`
}

export function textOver(values: Iterable<Value>): string {
  let held = ""
  for (const one of values) held += lineFor(one)
  return held
}

export function* linesOver(values: Iterable<Value>): Iterable<string> {
  for (const one of values) yield lineFor(one)
}

export function textsOverLines(lines: Iterable<string>, ceiling: number): Texts {
  const coder = new TextEncoder()
  const texts: string[] = []
  let held = ""
  let filled = 0
  for (const line of lines) {
    const size = coder.encode(line).length
    if (size > ceiling) {
      return {
        refused: `one value runs to ${size} bytes, over the ceiling of ${ceiling}, and no value is divided`,
      }
    }
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

export function textsOver(values: Iterable<Value>, ceiling: number): Texts {
  return textsOverLines(linesOver(values), ceiling)
}

export function partsOverLines(
  page: string,
  propertySlug: string,
  held: string,
  lines: Iterable<string>,
  ceiling: number,
  uncommitted = false
): Parts {
  const made = textsOverLines(lines, ceiling)
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
