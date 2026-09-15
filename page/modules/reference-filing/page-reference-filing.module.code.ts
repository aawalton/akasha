import { importsIn } from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"
import {
  NAMING_NONE,
  type Naming as Specifying,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { typed } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  namesIn,
  namesMortal,
  namingsIn,
  namingsInRows,
  reaches,
  type Shaped,
} from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import type { Rowing } from "akasha/page/modules/entries/page-entries.module.code.ts"
import {
  fileNameOf,
  IMPORT,
  lineOf,
  ownerOf,
  referencesAt,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Filed = {
  readonly entries: readonly Entry[]
  readonly refused: readonly string[]
}

export const NOTHING_FILED: Filed = { entries: [], refused: [] }

function keyOf(one: Entry): string {
  return `${one.at} ${one.line}`
}

export function namedFrom(
  value: Value,
  path: string,
  known: Shaped,
  repo: string,
  rowing: readonly Rowing[]
): Filed {
  const id = textAt(value, "id")
  if (id === null) return NOTHING_FILED
  const own = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  const dies = own !== null && known.mortal(slugOf(own))
  const from = under(repo, path)
  const entries: Entry[] = []
  const refused: string[] = []
  const already = new Set<string>()
  for (const one of [...namingsIn(value, known), ...namingsInRows(rowing, known)]) {
    if (one.identity) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        if (!dies && !namesMortal(named, wanted, known)) {
          refused.push(`${path}: \`${one.said}\` — ${reached.refused}`)
        }
        continue
      }
      const at = referencesAt(reached.path)
      if (at === null) continue
      const entry = {
        at,
        line: lineOf({ propertySlug: one.propertySlug, fileName: null, path: from, id }),
      }
      if (already.has(keyOf(entry))) continue
      already.add(keyOf(entry))
      entries.push(entry)
    }
  }
  return { entries, refused }
}

export function importedFrom(
  body: string,
  path: string,
  repo: string,
  naming: Specifying = NAMING_NONE
): readonly Entry[] {
  const from = under(repo, path)
  if (!typed(from)) return []
  const found: Entry[] = []
  const already = new Set<string>()
  for (const landed of importsIn(body, from, naming)) {
    const owner = ownerOf(landed)
    if (owner === null) continue
    const at = referencesAt(owner)
    if (at === null) continue
    const entry = {
      at,
      line: lineOf({
        propertySlug: IMPORT,
        fileName: fileNameOf(landed),
        path: from,
        id: null,
      }),
    }
    if (already.has(keyOf(entry))) continue
    already.add(keyOf(entry))
    found.push(entry)
  }
  return found
}
