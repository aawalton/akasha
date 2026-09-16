import { importsIn } from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"
import {
  NAMING_NONE,
  type Naming as Specifying,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { typed } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  claimantIn,
  under,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  namesIn,
  namesMortal,
  namingsIn,
  namingsInRows,
  type Reached,
  reaches,
  type Shaped,
  type Wanted,
} from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import {
  everyOfType,
  heldEach,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Rowing } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  fileNameOf,
  IMPORT,
  lineOf,
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

const filedOfType = heldEach(
  (reading: Reading, pageTypeSlug: string): ReadonlySet<string> =>
    new Set(everyOfType(reading, pageTypeSlug).map((one) => one.path))
)

const pageThere = heldEach((reading: Reading, path: string): boolean => {
  if (reading.read(path) !== null) return true
  const said = partedIn(path)
  return said !== null && filedOfType(reading, said.pageType).has(path)
})

type Reaching = {
  readonly propertySlug: string
  readonly said: string
  readonly named: string
  readonly wanted: Wanted
  readonly reached: Reached
}

function reachingIn(value: Value, known: Shaped, rowing: readonly Rowing[]): readonly Reaching[] {
  const found: Reaching[] = []
  for (const one of [...namingsIn(value, known), ...namingsInRows(rowing, known)]) {
    if (one.identity) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(one.held)) {
      found.push({
        propertySlug: one.propertySlug,
        said: one.said,
        named,
        wanted,
        reached: reaches(named, wanted, known),
      })
    }
  }
  return found
}

export type NamedOut = { readonly propertySlug: string; readonly path: string }

export function namedOut(
  value: Value,
  known: Shaped,
  rowing: readonly Rowing[]
): readonly NamedOut[] {
  const found: NamedOut[] = []
  for (const one of reachingIn(value, known, rowing)) {
    if ("refused" in one.reached) continue
    found.push({ propertySlug: one.propertySlug, path: one.reached.path })
  }
  return found
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
  for (const one of reachingIn(value, known, rowing)) {
    if ("refused" in one.reached) {
      if (!dies && !namesMortal(one.named, one.wanted, known)) {
        refused.push(`${path}: \`${one.said}\` — ${one.reached.refused}`)
      }
      continue
    }
    const at = referencesAt(one.reached.path)
    if (at === null) continue
    const entry = {
      at,
      line: lineOf({ propertySlug: one.propertySlug, fileName: null, path: from, id }),
    }
    if (already.has(keyOf(entry))) continue
    already.add(keyOf(entry))
    entries.push(entry)
  }
  return { entries, refused }
}

export function importedFrom(
  given: string | Reading,
  body: string,
  path: string,
  repo: string,
  naming: Specifying = NAMING_NONE
): readonly Entry[] {
  const from = under(repo, path)
  if (!typed(from)) return []
  const reading = readingIn(given)
  const found: Entry[] = []
  const already = new Set<string>()
  for (const landed of importsIn(body, from, naming)) {
    const owner = claimantIn(reading, landed)
    if (owner === null || !pageThere(reading, owner)) continue
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
