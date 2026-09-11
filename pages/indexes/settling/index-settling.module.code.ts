import { pageNamed, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  idsUnnamed,
  pagesElsewhere,
  pagesNaming,
  pagesOfTypes,
  pagesStranded,
  pagesTurned,
  relationsTurned,
  typesDeclaring,
} from "akasha/pages/indexes/beside-turning/beside-turning.module.code.ts"
import { declaredOf } from "akasha/pages/indexes/declaring/index-declaring.index.code.ts"
import {
  type Entry,
  fileKeysAt,
  fileKeysIn,
  filePropertiesOver,
  folderPropertiesOver,
  type Identifier,
  pageTypesIn,
  schemaAt,
  uncommittedFiledOver,
  uniquePropertiesAt,
} from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { identityIn } from "akasha/pages/indexes/identity/index-identity.index.code.ts"
import { importIn } from "akasha/pages/indexes/import/index-import.index.code.ts"
import { listedOf } from "akasha/pages/indexes/listing/index-listing.index.code.ts"
import {
  type Body,
  bodiesAt,
  reachingSettled,
  rereadOver,
} from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import { claimingIn } from "akasha/pages/indexes/path/index-path.index.code.ts"
import {
  sidecarsOver,
  under,
} from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import { knownIn } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import { indexThere } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  NOTHING_FILED,
  relationIn,
} from "akasha/pages/indexes/relation/index-relation.index.code.ts"
import { schemaIn } from "akasha/pages/indexes/schema/index-schema.index.code.ts"
import type { Filing, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { overlaidOn, readingNone } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { valueIn } from "akasha/pages/indexes/value/index-value.index.code.ts"
import {
  identifyingFrom,
  sourceAmong,
  sourceIn,
} from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { loadedFrom, type Value } from "akasha/pages/value/page-value.module.code.ts"

function keyOf(one: Entry): string {
  return `${one.at} ${one.line}`
}

export function filingOf(
  reading: Reading,
  was: readonly Entry[],
  now: readonly Entry[]
): readonly Filing[] {
  const kept = new Set(now.map(keyOf))
  const withdrawn = Map.groupBy(
    was.filter((one) => !kept.has(keyOf(one))),
    (one) => one.at
  )
  const added = Map.groupBy(now, (one) => one.at)
  const said: Filing[] = []
  for (const at of new Set([...withdrawn.keys(), ...added.keys()])) {
    const gone = new Set((withdrawn.get(at) ?? []).map((one) => one.line))
    const come = new Set((added.get(at) ?? []).map((one) => one.line))
    const surviving = new Set([...reading.lines(at)].filter((one) => !gone.has(one)))
    const coming = [...come].filter((one) => !surviving.has(one))
    said.push({ at, lines: [...surviving, ...coming].sort() })
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
  const sidecars = sidecarsOver(reading, left)
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
    reading,
    importing.flatMap((one) =>
      one.before === null ? [] : importIn(one.before, one.path, repo, wasNaming)
    ),
    importing.flatMap((one) =>
      one.after === null ? [] : importIn(one.after, one.path, repo, naming)
    )
  )

  const wasSchema = held.flatMap((one) => (one.was === null ? [] : schemaIn(one.was)))
  const nowSchema = held.flatMap((one) => (one.now === null ? [] : schemaIn(one.now)))
  const schema = filingOf(reading, wasSchema, nowSchema)
  const declaring = filingOf(reading, declaredOf(wasSchema), declaredOf(nowSchema))
  const overSchema = overlaidOn(reading, [...schema, ...declaring])
  const wasUnique = uniquePropertiesAt(reading)
  const unique = uniquePropertiesAt(overSchema)
  refusingEmpty(unique, held.filter((one) => one.now !== null).length)
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
  const nowSource = sourceAmong(left, sourceIn(overSchema, pageOf))
  const wasIdentifying = identifyingFrom(wasSource)
  const nowIdentifying = identifyingFrom(nowSource)
  const carriedAt = new Set(carried.keys())
  const elsewhere = pagesElsewhere(reading, turned, carriedAt)
  const stranded = pagesStranded(reading, before, left, carriedAt)
  const identity = filingOf(
    reading,
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
  const wasBesides = {
    fileProperties: filePropertiesOver(reading, []),
    sidecars: sidecarsOver(reading, []),
  }
  const wasClaim = claimingIn(
    repo,
    wasBesides.fileProperties,
    wasBesides.sidecars,
    uncommittedFiledOver(reading, []),
    folderPropertiesOver(reading, []),
    carried
  )
  const claim = claimingIn(
    repo,
    filedBy,
    sidecars,
    uncommittedFiledOver(reading, left),
    folderPropertiesOver(reading, left),
    carried
  )
  const beside = pagesTurned(reading, wasBesides, { fileProperties: filedBy, sidecars }, carriedAt)
  const wasPaths = [
    ...held.flatMap((one) => (one.was === null ? [] : wasClaim(one.was, one.path, true))),
    ...beside.flatMap((one) => wasClaim(one.value, one.path, true)),
  ]
  const nowPaths = [
    ...held.flatMap((one) => (one.now === null ? [] : claim(one.now, one.path, false))),
    ...beside.flatMap((one) => claim(one.value, one.path, false)),
  ]
  const paths = filingOf(reading, wasPaths, nowPaths)
  const listing = filingOf(reading, listedOf(wasPaths), listedOf(nowPaths))

  const valued = filingOf(
    reading,
    held.flatMap((one) => (one.was === null ? [] : valueIn(one.was, one.path, repo))),
    held.flatMap((one) => (one.now === null ? [] : valueIn(one.now, one.path, repo)))
  )

  const stepped = overlaidOn(reading, [
    ...imported,
    ...identity,
    ...paths,
    ...schema,
    ...declaring,
    ...valued,
  ])
  const wasKnown = knownIn(reading, wasPageOf)
  const known = knownIn(stepped, nowPageOf)
  const turnedRelations = relationsTurned(schemaAt(reading), schemaAt(overSchema))
  const relating = pagesOfTypes(
    reading,
    typesDeclaring(reading, [wasSource, nowSource], turnedRelations),
    carriedAt
  )
  const rebound = pagesNaming(reading, idsUnnamed(reading, identity), carriedAt)
  const already = new Set(relating.map((one) => one.path))
  const refiling = [...relating, ...rebound.filter((one) => !already.has(one.path))]
  const was = [
    ...held.map((one) =>
      one.was === null ? NOTHING_FILED : relationIn(one.was, one.path, wasKnown, repo)
    ),
    ...refiling.map((one) => relationIn(one.value, one.path, wasKnown, repo)),
  ]
  const now = [
    ...held.map((one) =>
      one.now === null ? NOTHING_FILED : relationIn(one.now, one.path, known, repo)
    ),
    ...refiling.map((one) => relationIn(one.value, one.path, known, repo)),
  ]
  const relation = filingOf(
    reading,
    was.flatMap((one) => one.entries),
    now.flatMap((one) => one.entries)
  )

  const filings = [
    ...imported,
    ...identity,
    ...paths,
    ...schema,
    ...relation,
    ...valued,
    ...listing,
    ...declaring,
  ]
  return {
    reading: overlaidOn(given, filings),
    filings,
    noted,
    refusedBefore: was.flatMap((one) => one.refused),
    refused: now.flatMap((one) => one.refused),
  }
}
