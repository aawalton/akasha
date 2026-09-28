import {
  everyOfType,
  listedAnywhere,
  listedAt,
  listedById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { namersThrough } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import { lowerUuid } from "akasha/page/name-format/pages/lower-uuid/lower-uuid.name-format.code.ts"
import {
  carriedFor,
  type Picking,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import type { Test } from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const TYPE = "type"

const SLUG = "slug"

const ID = "id"

const SLASH = "/"

const RELATION = "relation-property"

const NAMED_OUTRIGHT: ReadonlySet<string> = new Set([TYPE, SLUG, ID])

export type Where = Readonly<Record<string, Test>>

function namedBy(test: Test | undefined): readonly string[] | null {
  if (test === undefined) return null
  const named = test.is === undefined ? test.in : [test.is]
  return named === undefined ? null : named.filter((one) => !one.includes(SLASH))
}

function byId(reading: Reading, ids: readonly string[]): readonly string[] {
  const found: string[] = []
  for (const id of ids) {
    const listed = listedById(reading, id)
    if (listed !== null) found.push(listed.path)
  }
  return found
}

function targetsOf(test: Test, many: boolean): readonly string[] | null {
  if (test.is !== undefined) return [test.is]
  if (test.in !== undefined) return test.in
  if (!many) return null
  if (test.has !== undefined) return [test.has]
  const bound = test.contains
  if (bound === undefined) return null
  return typeof bound === "string" ? [bound] : bound
}

function targetPaths(reading: Reading, targets: readonly string[]): readonly string[] | null {
  const found: string[] = []
  for (const said of targets) {
    if (lowerUuid(said)) {
      const listed = listedById(reading, said)
      if (listed !== null) found.push(listed.path)
      continue
    }
    const cut = said.indexOf(SLASH)
    if (cut <= 0 || said.indexOf(SLASH, cut + 1) !== -1) return null
    for (const one of listedAt(reading, said.slice(0, cut), said.slice(cut + 1))) {
      found.push(one.path)
    }
  }
  return found
}

function relatedIn(
  reading: Reading,
  kind: string,
  where: Where,
  relations: ReadonlySet<string>
): readonly string[] | null {
  for (const one of carriedFor(reading, kind)) {
    const test = where[one.key]
    if (test === undefined || one.uncommitted || !relations.has(one.pageTypeSlug)) continue
    const targets = targetsOf(test, one.many)
    const named = targets === null ? null : targetPaths(reading, targets)
    if (named === null) continue
    return named
      .flatMap((at) => namersThrough(reading, at, one.pagePropertySlug))
      .filter((path) => partedIn(path)?.pageType === kind)
  }
  return null
}

export function pickingFor(reading: Reading, where: Where | undefined): Picking | null {
  if (where === undefined) return null
  const types = namedBy(where[TYPE])
  const ids = namedBy(where[ID])
  const slugs = namedBy(where[SLUG])
  const relating = Object.keys(where).some((key) => !NAMED_OUTRIGHT.has(key))
  if (types === null && ids === null && slugs === null && !relating) return null
  const identified = ids === null ? null : byId(reading, ids)
  let relations: ReadonlySet<string> | null = null
  return (kind) => {
    if (types !== null && !types.includes(kind)) return []
    if (identified !== null) return identified.filter((path) => partedIn(path)?.pageType === kind)
    if (slugs !== null) {
      return slugs.flatMap((slug) => listedAnywhere(reading, kind, slug).map((one) => one.path))
    }
    if (!relating) return null
    relations ??= kindsUnder(RELATION, reading)
    return relatedIn(reading, kind, where, relations)
  }
}

type Paging = {
  readonly where?: Where
  readonly sortBy?: string
  readonly descending?: boolean
  readonly limit?: number
  readonly offset?: number
}

export type Paged = {
  readonly paths: readonly string[]
  readonly picking: Picking
}

export function pagedFor(reading: Reading, kinds: readonly string[], paging: Paging): Paged | null {
  const { limit } = paging
  if (paging.where !== undefined || paging.sortBy !== undefined || limit === undefined) return null
  const listed = kinds.flatMap((kind) => everyOfType(reading, kind).map((one) => one.path))
  const paths = [...new Set(listed)].sort()
  const ordered = paging.descending === true ? [...paths].reverse() : paths
  const from = paging.offset ?? 0
  const taken = ordered.slice(from, from + limit)
  return { paths, picking: (kind) => taken.filter((path) => partedIn(path)?.pageType === kind) }
}
