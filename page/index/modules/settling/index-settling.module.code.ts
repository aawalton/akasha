import { edgeIn, NOTHING_FILED } from "akasha/page/index/edge/index-edge.index.code.ts"
import { identityIn } from "akasha/page/index/identity/index-identity.index.code.ts"
import { importIn } from "akasha/page/index/import/index-import.index.code.ts"
import {
  idsUnnamed,
  pagesElsewhere,
  pagesNaming,
  pagesOfTypes,
  pagesStranded,
  relationsTurned,
  typesDeclaring,
} from "akasha/page/index/modules/beside-turning/beside-turning.module.code.ts"
import {
  type Entry,
  fileKeysAt,
  fileKeysIn,
  filePropertiesOver,
  type Identifier,
  pageTypesIn,
  uniquePropertiesAt,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  type Body,
  bodiesAt,
  reachingSettled,
  rereadOver,
} from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { shapesAt } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import { knownIn, type Shaped } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import {
  indexThere,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Filing, Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  overlaidOn,
  readingNone,
} from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { ruleIn } from "akasha/page/index/rule/index-rule.index.code.ts"
import {
  pageTypeSlugsIn,
  shapeFiled,
  shapesFiled,
  shapesIn,
} from "akasha/page/index/shapes/index-shapes.index.code.ts"
import { type Rowing, rowsOver } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { pageNamed, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  identifyingFrom,
  sourceAmong,
  sourceIn,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PAGE_TYPE = "page-type"

function keyOf(one: Entry): string {
  return `${one.at} ${one.line}`
}

function shapesOver(given: Reading): readonly Entry[] {
  const values = valuesOfType(given, PAGE_TYPE).map((one) => one.value)
  return shapesFiled(
    sourceAmong(
      values,
      sourceIn(given, () => null)
    ),
    shapesAt(given),
    pageTypeSlugsIn(values)
  )
}

function reshaping(values: readonly Value[]): boolean {
  return pageTypeSlugsIn(values).length > 0 || shapesIn(values).size > 0
}

export function filingOf(was: readonly Entry[], now: readonly Entry[]): readonly Filing[] {
  const kept = new Set(now.map(keyOf))
  const had = new Set(was.map(keyOf))
  const withdrawn = Map.groupBy(
    was.filter((one) => !kept.has(keyOf(one))),
    (one) => one.at
  )
  const added = Map.groupBy(
    now.filter((one) => !had.has(keyOf(one))),
    (one) => one.at
  )
  const said: Filing[] = []
  for (const at of new Set([...withdrawn.keys(), ...added.keys()])) {
    const came = new Set((added.get(at) ?? []).map((one) => one.line))
    const went = [...new Set((withdrawn.get(at) ?? []).map((one) => one.line))].filter(
      (one) => !came.has(one)
    )
    if (came.size === 0 && went.length === 0) continue
    said.push({ at, came: [...came], went })
  }
  return said
}

function pageShaped(path: string, fileProperties: ReadonlyMap<string, string | null>): boolean {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return false
  return fileProperties.get(said.pageType) !== null
}

const NOTHING_DECLARES =
  "these pages declare no property carrying a `unique`, so no identity would be filed — the index refuses rather than answering empty"

export function refusingEmpty(unique: ReadonlyMap<string, Identifier>, pages: number): undefined {
  if (pages > 0 && unique.size === 0) throw new Error(NOTHING_DECLARES)
}

export type Moving = {
  readonly path: string
  readonly before: string | null
  readonly after: string | null
}

export type Settling = {
  readonly reading: Reading
  readonly filings: readonly Filing[]
  readonly noted: readonly string[]
  readonly refusedBefore: readonly string[]
  readonly refused: readonly string[]
}

function turningIn(
  was: ReadonlyMap<string, Identifier>,
  now: ReadonlyMap<string, Identifier>
): ReadonlySet<string> {
  const said = new Set<string>()
  for (const slug of new Set([...was.keys(), ...now.keys()])) {
    const before = was.get(slug)
    const after = now.get(slug)
    if (before?.key !== after?.key || before?.uniqueKind !== after?.uniqueKind) said.add(slug)
  }
  return said
}

function asBuilt(given: Reading): Reading {
  return indexThere(given) ? given : readingNone()
}

export function settlingOver(
  given: Reading,
  repo: string,
  moving: readonly Moving[],
  pageOf: (path: string) => Value | null,
  bodyAt: Body = bodiesAt(repo)
): Settling {
  const reading = asBuilt(given)
  const pageTypes = pageTypesIn(reading)
  const filed = fileKeysAt(reading)
  const noted: string[] = []
  const readInto = (body: string | null, path: string): Value | null => {
    if (body === null || !pageShaped(path, filed)) return null
    const loaded = loadedFrom(body)
    if (loaded.failed !== null && pageNamed(path, pageTypes)) {
      noted.push(`${path}: its body did not load, so it is not indexed — ${loaded.failed}`)
    }
    return loaded.value
  }

  const held = moving.map((one) => ({
    path: one.path,
    before: one.before,
    after: one.after,
    was: readInto(one.before, one.path),
    now: readInto(one.after, one.path),
  }))

  const left = held.flatMap((one) => (one.now === null ? [] : [one.now]))
  const fileProperties = new Map<string, string | null>([...filed, ...fileKeysIn(left)])
  const filedBy = filePropertiesOver(reading, left)
  const naming = reachingSettled(reading, held, moving, repo, fileProperties, filedBy)
  const { was: wasNaming, reread } = rereadOver(
    reading,
    held,
    repo,
    fileProperties,
    filedBy,
    naming,
    bodyAt
  )
  const importing = [...held, ...reread]

  const imported = filingOf(
    importing.flatMap((one) =>
      one.before === null ? [] : importIn(one.before, one.path, repo, wasNaming)
    ),
    importing.flatMap((one) =>
      one.after === null ? [] : importIn(one.after, one.path, repo, naming)
    )
  )

  const ruled = filingOf(
    held.flatMap((one) => (one.before === null ? [] : ruleIn(one.before, one.path, repo))),
    held.flatMap((one) => (one.after === null ? [] : ruleIn(one.after, one.path, repo)))
  )

  const shaping = filingOf(
    held.flatMap((one) => (one.was === null ? [] : shapeFiled(one.was))),
    held.flatMap((one) => (one.now === null ? [] : shapeFiled(one.now)))
  )
  const overShaped = overlaidOn(reading, [...shaping])
  const wasUnique = uniquePropertiesAt(reading)
  const unique = uniquePropertiesAt(overShaped)
  if (indexThere(given)) refusingEmpty(unique, held.filter((one) => one.now !== null).length)
  const turned = turningIn(wasUnique, unique)
  const carried = new Map(held.map((one) => [under(repo, one.path), one]))
  const wasPageOf = (path: string): Value | null => {
    const one = carried.get(under(repo, path))
    return one === undefined ? pageOf(path) : one.was
  }
  const nowPageOf = (path: string): Value | null => {
    const one = carried.get(under(repo, path))
    return one === undefined ? pageOf(path) : one.now
  }
  const before = held.flatMap((one) => (one.was === null ? [] : [one.was]))
  const wasSource = sourceAmong(before, sourceIn(reading, wasPageOf))
  const nowSource = sourceAmong(left, sourceIn(overShaped, pageOf))
  const wasIdentifying = identifyingFrom(wasSource)
  const nowIdentifying = identifyingFrom(nowSource)
  const carriedAt = new Set(carried.keys())
  const elsewhere = pagesElsewhere(reading, turned, carriedAt)
  const stranded = pagesStranded(reading, before, left, carriedAt)
  const identity = filingOf(
    [
      ...held.flatMap((one) =>
        one.was === null ? [] : identityIn(one.was, one.path, repo, wasIdentifying)
      ),
      ...elsewhere.flatMap((one) => identityIn(one.value, one.path, repo, wasIdentifying, turned)),
      ...stranded.flatMap((one) => identityIn(one.value, one.path, repo, wasIdentifying)),
    ],
    [
      ...held.flatMap((one) =>
        one.now === null ? [] : identityIn(one.now, one.path, repo, nowIdentifying)
      ),
      ...elsewhere.flatMap((one) => identityIn(one.value, one.path, repo, nowIdentifying, turned)),
    ]
  )
  const wrote = new Map(moving.map((one) => [under(repo, one.path), one.after] as const))
  const had = new Map(moving.map((one) => [under(repo, one.path), one.before] as const))
  const stepped = overlaidOn(reading, [...imported, ...identity, ...shaping], wrote)
  const carrying =
    reshaping(before) || reshaping(left)
      ? filingOf(shapesOver(overlaidOn(reading, [], had)), shapesOver(stepped))
      : []
  const wasBody: Body = (at) => {
    const one = carried.get(under(repo, at))
    return one === undefined ? bodyAt(at) : one.before
  }
  const nowBody: Body = (at) => {
    const one = carried.get(under(repo, at))
    return one === undefined ? bodyAt(at) : one.after
  }
  const rowsFor = (path: string, value: Value, shaped: Shaped, body: Body): readonly Rowing[] =>
    rowsOver(under(repo, path), value, shaped.entriedIn(value), body)
  const wasKnown = knownIn(reading, wasPageOf)
  const known = knownIn(stepped, nowPageOf)
  const turnedRelations = relationsTurned(shapesAt(reading), shapesAt(overShaped))
  const relating = pagesOfTypes(
    reading,
    typesDeclaring(reading, [wasSource, nowSource], turnedRelations),
    carriedAt
  )
  const rebound = pagesNaming(reading, idsUnnamed(identity), carriedAt)
  const already = new Set(relating.map((one) => one.path))
  const refiling = [...relating, ...rebound.filter((one) => !already.has(one.path))]
  const was = [
    ...held.map((one) =>
      one.was === null
        ? NOTHING_FILED
        : edgeIn(one.was, one.path, wasKnown, repo, rowsFor(one.path, one.was, wasKnown, wasBody))
    ),
    ...refiling.map((one) =>
      edgeIn(one.value, one.path, wasKnown, repo, rowsFor(one.path, one.value, wasKnown, wasBody))
    ),
  ]
  const now = [
    ...held.map((one) =>
      one.now === null
        ? NOTHING_FILED
        : edgeIn(one.now, one.path, known, repo, rowsFor(one.path, one.now, known, nowBody))
    ),
    ...refiling.map((one) =>
      edgeIn(one.value, one.path, known, repo, rowsFor(one.path, one.value, known, nowBody))
    ),
  ]
  const edge = filingOf(
    was.flatMap((one) => one.entries),
    now.flatMap((one) => one.entries)
  )

  const filings = [...imported, ...ruled, ...identity, ...edge, ...shaping, ...carrying]
  return {
    reading: overlaidOn(given, filings, wrote),
    filings,
    noted,
    refusedBefore: was.flatMap((one) => one.refused),
    refused: now.flatMap((one) => one.refused),
  }
}
