import { pageTypesIn, valueIn } from "../../../pages-system/indexes/index-entries.module.code.ts"
import {
  idsNaming,
  indexIn,
  standingById,
} from "../../../pages-system/indexes/index-reading.module.code.ts"
import { type Known, namesIn, reaches } from "../../../pages-system/indexes/reaching.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name.module.code.ts"
import { kindsUnder } from "../../../pages-system/page-type/page-type-descent.module.code.ts"
import { bodyOf } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"
import {
  type Carried,
  carriedBy,
  knownAcross,
} from "../relation-resolves/relation-resolves.check.code.ts"

const INSIDE = "akasha/"

const DOMAIN = "domain"

const PART_SLUGS = "part-slugs"

const PARTS = "partSlugs"

const THE_WHOLE = "akasha-system"

export type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export function domainNamedIn(root: string, path: string): Named | null {
  if (!path.startsWith(INSIDE)) return null
  const said = namedIn(path)
  if (said === null) return null
  if (!kindsUnder(root, DOMAIN).has(said.tail)) return null
  return { pageTypeSlug: said.tail, slug: said.stem }
}

function partsOf(value: Record<string, unknown> | null): readonly string[] {
  const held = value === null ? null : value[PARTS]
  return held === null || held === undefined ? [] : namesIn(held)
}

export type Dropped = {
  readonly path: string
  readonly id: string
  readonly shown: string
}

export function droppedBy(
  leaving: Leaving,
  carried: readonly Carried[],
  known: Known
): readonly Dropped[] {
  const found: Dropped[] = []
  for (const one of carried) {
    const was = leaving.was(one.path)
    if (was === null) continue
    const text = bodyOf({ root: leaving.root, path: one.path, bytes: was })
    const before = text === null ? null : valueIn(text)
    const after = new Set(partsOf(one.value))
    for (const said of partsOf(before)) {
      if (after.has(said)) continue
      const reached = reaches(said, DOMAIN, known)
      if (!("id" in reached)) continue
      const standing = known.byId(reached.id)
      if (standing !== null) found.push({ path: standing.path, id: reached.id, shown: said })
    }
  }
  return found
}

export function namedAsParts(carried: readonly Carried[], known: Known): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of carried) {
    const held = one.value[PARTS]
    if (held === null || held === undefined) continue
    for (const said of namesIn(held)) {
      const reached = reaches(said, DOMAIN, known)
      if ("id" in reached) found.add(reached.id)
    }
  }
  return found
}

export function namedInIndex(leaving: Leaving, id: string): boolean {
  const touched = new Set(leaving.changed)
  for (const namer of idsNaming(leaving.root, id, PART_SLUGS)) {
    const one = standingById(leaving.root, namer)
    if (one !== null && !touched.has(one.path)) return true
  }
  return false
}

function reasonFor(shown: string): string {
  return (
    `no page names \`${shown}\` among its parts — every page standing under ` +
    `\`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of a page above it`
  )
}

export function domainIsNamedByAParent(leaving: Leaving): readonly Judged[] {
  const carried = carriedBy(leaving, pageTypesIn(indexIn(leaving.root)))
  const known = knownAcross(leaving, carried)
  const named = namedAsParts(carried, known)
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): void => {
    if (judged.has(path)) return
    judged.add(path)
    if (named.has(id) || namedInIndex(leaving, id)) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of leaving.changed) {
    if (leaving.at(path) === null) continue
    const held = domainNamedIn(leaving.root, path)
    if (held === null) continue
    if (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE) continue
    const found = known.at(held.pageTypeSlug, held.slug)
    const one = found[0]
    if (found.length !== 1 || one === undefined) {
      throw new Error(
        `the index answers ${found.length} pages to the ${held.pageTypeSlug} slug ` +
          `\`${held.slug}\`, so who names it could not be looked up`
      )
    }
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  for (const one of droppedBy(leaving, carried, known)) judge(one.path, one.id, one.shown)
  return said
}
