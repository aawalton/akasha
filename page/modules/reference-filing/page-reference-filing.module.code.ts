import { readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { importingIn } from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"
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
  eachTarget,
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
import {
  pageOf as pageNameOf,
  partedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  fileNameOf,
  IMPORT,
  lineOf,
  referenceIn,
  referencesAt,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

type Filed = {
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

type NamedOut = { readonly propertySlug: string; readonly path: string }

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
  const own = textAt(value, "type")
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
  for (const one of importingIn(body, from, naming)) {
    const owner = claimantIn(reading, one.at)
    if (owner === null || !pageThere(reading, owner)) continue
    const at = referencesAt(owner)
    if (at === null) continue
    const entry = {
      at,
      line: lineOf({
        propertySlug: IMPORT,
        fileName: fileNameOf(one.at),
        path: from,
        id: null,
        typed: one.typed,
        deferred: one.deferred,
      }),
    }
    if (already.has(keyOf(entry))) continue
    already.add(keyOf(entry))
    found.push(entry)
  }
  return found
}

type Turning = {
  readonly path: string
  readonly was: Value | null
  readonly now: Value | null
}

function propertySlugsById(values: readonly (Value | null)[]): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of values) {
    if (one === null || textAt(one, "propertySlug") === null) continue
    const id = textAt(one, "id")
    const slug = textAt(one, "slug")
    if (id !== null && slug !== null) found.set(id, slug)
  }
  return found
}

export function propertiesRenamedIn(held: readonly Turning[]): ReadonlyMap<string, string> {
  const was = propertySlugsById(held.map((one) => one.was))
  const now = propertySlugsById(held.map((one) => one.now))
  const found = new Map<string, string>()
  for (const [id, slug] of was) {
    const next = now.get(id)
    if (next !== undefined && next !== slug) found.set(slug, next)
  }
  return found
}

export function turnedLine(line: string, renamed: ReadonlyMap<string, string>): string {
  const one = referenceIn(line)
  if (one === null) return line
  const to = renamed.get(one.propertySlug)
  return to === undefined ? line : lineOf({ ...one, propertySlug: to })
}

function filesNaming(
  reading: Reading,
  known: Shaped,
  renamed: ReadonlyMap<string, string>
): readonly string[] {
  const found = new Set<string>()
  for (const was of renamed.keys()) {
    const wanted = eachTarget(known.targetOf(was))
    const types = new Set([...wanted, ...wanted.flatMap((one) => known.admitting(one))])
    for (const pageTypeSlug of types) {
      for (const one of everyOfType(reading, pageTypeSlug)) {
        const at = referencesAt(one.path)
        if (at !== null) found.add(at)
      }
    }
  }
  return [...found].sort()
}

export function linesRenamedIn(
  reading: Reading,
  known: Shaped,
  renamed: ReadonlyMap<string, string>,
  carried: ReadonlySet<string>,
  vacated: ReadonlySet<string>
): { readonly was: readonly Entry[]; readonly now: readonly Entry[] } {
  const was: Entry[] = []
  for (const at of filesNaming(reading, known, renamed)) {
    if (vacated.has(at)) continue
    for (const line of (reading.read(at) ?? "").split("\n")) {
      const one = line === "" ? null : referenceIn(line)
      if (one === null || !renamed.has(one.propertySlug) || carried.has(one.path)) continue
      was.push({ at, line })
    }
  }
  const now = was.map((one) => ({ at: one.at, line: turnedLine(one.line, renamed) }))
  return { was, now }
}

export function namedFor(repo: string, page: string): readonly string[] {
  const said = partedIn(page)
  if (said === null) return []
  const opening = `${pageNameOf(said)}.`
  const folder = dirname(page)
  let names: readonly string[]
  try {
    names = readdirSync(join(repo, folder))
  } catch {
    return []
  }
  return names
    .filter((one) => one.startsWith(opening))
    .map((one) => join(folder, one))
    .sort()
}

export function ownedAnew(
  held: readonly Turning[],
  repo: string,
  carried: ReadonlySet<string>
): readonly string[] {
  const found = new Set<string>()
  for (const one of held) {
    if (one.was !== null || one.now === null) continue
    for (const at of namedFor(repo, under(repo, one.path))) {
      if (!carried.has(at)) found.add(at)
    }
  }
  return [...found].sort()
}
