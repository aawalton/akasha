import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SECTION = "carried"

const HOLDS = "jsonl"

const ENDING = `.${SECTION}.${HOLDS}`

export function carryingAt(pagePath: string): string | null {
  return besideAt(pagePath, SECTION, HOLDS)
}

export function carriedFiled(path: string): boolean {
  return path.endsWith(ENDING)
}

export function linesFor(value: Value): readonly string[] {
  return Object.entries(value)
    .map(([key, held]) => JSON.stringify({ [key]: held }))
    .toSorted()
}
