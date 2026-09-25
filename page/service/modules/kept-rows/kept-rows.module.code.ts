import { existsSync } from "node:fs"
import { join } from "node:path"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { ENTRY_CEILING } from "akasha/page/modules/entry-ceiling/entry-ceiling.module.code.ts"
import { partsOver } from "akasha/page/modules/entry-writing/page-entry-writing.module.code.ts"
import { uncommittedPartsOf } from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

const JSONL = "jsonl"

type Put = {
  readonly path: string
  readonly content: string
}

type KeptRows =
  | {
      readonly ending: string
      readonly puts: readonly Put[]
      readonly removes: readonly string[]
    }
  | { readonly refused: string }

type Rows = { readonly rows: readonly Value[] } | { readonly refused: string }

function rowsIdentified(key: string, given: readonly unknown[]): Rows {
  const rows: Value[] = []
  for (const one of given) {
    if (!isRecord(one)) {
      return { refused: `\`${key}\` keeps its values as rows, and a row handed over is no object` }
    }
    const named = typeof one[ID] === "string" && one[ID] !== ""
    rows.push(named ? one : { [ID]: Bun.randomUUIDv7(), ...one })
  }
  return { rows }
}

type Keyed = {
  readonly key: string
  readonly propertySlug: string
}

export function keptRowsIn(
  root: string,
  page: string,
  { key, propertySlug }: Keyed,
  given: readonly unknown[]
): KeptRows {
  const identified = rowsIdentified(key, given)
  if ("refused" in identified) return identified
  const said = uncommittedIn(root, page)?.[key]
  const ending = typeof said === "string" && said !== "" ? said : JSONL
  const made = partsOver(page, propertySlug, ending, identified.rows, ENTRY_CEILING, true)
  if ("refused" in made) return { refused: made.refused }
  const puts = made.parts.map((part) => ({ path: part.path, content: part.text }))
  const there = (path: string): boolean => existsSync(join(root, path))
  const removes = uncommittedPartsOf(page, propertySlug, ending, there).slice(puts.length)
  return { ending, puts, removes }
}
