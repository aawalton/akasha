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
import { identitiesIn } from "akasha/page/index/modules/identities/index-identities.module.code.ts"
import {
  bodiesBeside,
  wholeOf,
} from "akasha/page/index/modules/keeping/index-keeping.module.code.ts"
import {
  type Body,
  bodiesAt,
  reachingSettled,
  rereadOver,
} from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  shapesAt,
  shapesLaidOn,
  shapesWritten,
} from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import { knownIn, type Shaped } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { indexThere } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Filing, Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  overlaidOn,
  readingNone,
} from "akasha/page/index/modules/surface/index-surface.module.code.ts"

import { carryingAt, linesFor } from "akasha/page/modules/carried/page-carried.module.code.ts"
import { type Rowing, rowsOver } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { pageNamed, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  importedFrom,
  NOTHING_FILED as NOTHING_REFERENCED,
  namedFrom,
} from "akasha/page/modules/reference-filing/page-reference-filing.module.code.ts"
import { referencesAt } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  identifyingFrom,
  sourceAmong,
  sourceIn,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const ID = "id"

function keyOf(one: Entry): string {
  return `${one.at} ${one.line}`
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

export function carryingOver(
  held: readonly {
    readonly path: string
    readonly was: Value | null
    readonly now: Value | null
  }[],
  repo: string
): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, readonly string[]>()
  for (const one of held) {
    if (one.was === null && one.now === null) continue
    const at = carryingAt(under(repo, one.path))
    if (at === null) continue
    found.set(at, one.now === null ? [] : linesFor(one.now))
  }
  return found
}

function pageShaped(path: string, fileProperties: ReadonlyMap<string, string | null>): boolean {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return false
  return fileProperties.get(said.pageType) !== null
}

export type Moving = {
  readonly path: string
  readonly before: string | null
  readonly after: string | null
}

export type Settling = {
  readonly reading: Reading
  readonly filings: readonly Filing[]
  readonly references: readonly Filing[]
  readonly carried: ReadonlyMap<string, string | null>
  readonly beside: ReadonlyMap<string, string>
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

  const written = shapesWritten(reading, held)
  const bodied = new Map<string, string>()
  for (const [where, whole] of written.bodies) bodied.set(under(repo, where), whole)
  const overShaped = shapesLaidOn(overlaidOn(reading, [], bodied), written.shapes)
  const wasUnique = uniquePropertiesAt(reading)
  const unique = uniquePropertiesAt(overShaped)
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
        one.was === null ? [] : identitiesIn(one.was, one.path, repo, wasIdentifying)
      ),
      ...elsewhere.flatMap((one) =>
        identitiesIn(one.value, one.path, repo, wasIdentifying, turned)
      ),
      ...stranded.flatMap((one) => identitiesIn(one.value, one.path, repo, wasIdentifying)),
    ],
    [
      ...held.flatMap((one) =>
        one.now === null ? [] : identitiesIn(one.now, one.path, repo, nowIdentifying)
      ),
      ...elsewhere.flatMap((one) =>
        identitiesIn(one.value, one.path, repo, nowIdentifying, turned)
      ),
    ]
  )
  const wrote = new Map(moving.map((one) => [under(repo, one.path), one.after] as const))
  const stepped = shapesLaidOn(
    overlaidOn(reading, identity, new Map<string, string | null>([...wrote, ...bodied])),
    written.shapes
  )
  const wasBody: Body = (at) => {
    const one = carried.get(under(repo, at))
    return one === undefined ? bodyAt(at) : one.before
  }
  const nowBody: Body = (at) => {
    const one = carried.get(under(repo, at))
    return one === undefined ? bodyAt(at) : one.after
  }
  const rowsFor = (path: string, value: Value, shaped: Shaped, body: Body): readonly Rowing[] =>
    rowsOver(under(repo, path), value, shaped.entriedIn(value), body, (said) => {
      noted.push(said)
    })
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
  const referencedWas = [
    ...held.map((one) =>
      one.was === null
        ? NOTHING_REFERENCED
        : namedFrom(
            one.was,
            one.path,
            wasKnown,
            repo,
            rowsFor(one.path, one.was, wasKnown, wasBody)
          )
    ),
    ...refiling.map((one) =>
      namedFrom(
        one.value,
        one.path,
        wasKnown,
        repo,
        rowsFor(one.path, one.value, wasKnown, wasBody)
      )
    ),
  ]
  const referencedNow = [
    ...held.map((one) =>
      one.now === null
        ? NOTHING_REFERENCED
        : namedFrom(one.now, one.path, known, repo, rowsFor(one.path, one.now, known, nowBody))
    ),
    ...refiling.map((one) =>
      namedFrom(one.value, one.path, known, repo, rowsFor(one.path, one.value, known, nowBody))
    ),
  ]
  const arrived = new Map<string, string>()
  for (const one of held) {
    if (one.now === null) continue
    const at = referencesAt(under(repo, one.path))
    const id = textAt(one.now, ID)
    if (at !== null && id !== null) arrived.set(id, at)
  }
  const emptied = held.flatMap((one) => {
    if (one.was === null || one.now !== null) return []
    const at = referencesAt(under(repo, one.path))
    if (at === null) return []
    const id = textAt(one.was, ID)
    return [{ at, to: id === null ? undefined : arrived.get(id) }]
  })
  const vacated = new Set(emptied.map((one) => one.at))
  const movedTo = new Map(
    emptied.flatMap((one) =>
      one.to === undefined || one.to === one.at ? [] : [[one.at, one.to] as const]
    )
  )
  const leftBehind = [...vacated].flatMap((at) =>
    (reading.read(at) ?? "")
      .split("\n")
      .filter((line) => line !== "")
      .map((line) => ({ at, line }))
  )
  const refilingAt = new Set(refiling.map((one) => under(repo, one.path)))
  const carriedOn = leftBehind.flatMap((one) => {
    const to = movedTo.get(one.at)
    if (to === undefined) return []
    const said = JSON.parse(one.line) as { readonly path?: unknown; readonly id?: unknown }
    if (typeof said.path !== "string" || typeof said.id !== "string") return []
    if (carriedAt.has(said.path) || refilingAt.has(said.path)) return []
    return [{ at: to, line: one.line }]
  })
  const references = filingOf(
    [
      ...leftBehind,
      ...referencedWas.flatMap((one) => one.entries),
      ...importing.flatMap((one) =>
        one.before === null ? [] : importedFrom(reading, one.before, one.path, repo, wasNaming)
      ),
    ],
    [
      ...carriedOn,
      ...referencedNow.flatMap((one) => one.entries),
      ...importing.flatMap((one) =>
        one.after === null ? [] : importedFrom(stepped, one.after, one.path, repo, naming)
      ),
    ].filter((one) => !vacated.has(one.at))
  )

  const carriedBodies = new Map<string, string | null>(
    [...carryingOver(held, repo)].map(([at, lines]) => [
      at,
      lines.length === 0 ? null : wholeOf(lines),
    ])
  )

  const filings = [...identity]
  return {
    reading: shapesLaidOn(
      overlaidOn(
        given,
        filings,
        new Map<string, string | null>([
          ...wrote,
          ...bodied,
          ...bodiesBeside(reading, references),
          ...carriedBodies,
        ])
      ),
      written.shapes
    ),
    filings,
    references,
    carried: carriedBodies,
    beside: bodied,
    noted,
    refusedBefore: referencedWas.flatMap((one) => one.refused),
    refused: referencedNow.flatMap((one) => one.refused),
  }
}
