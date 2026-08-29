import {
  pageTypesIn,
  textAt,
  type Value,
  valueIn,
} from "../../../pages-system/indexes/index-entries.module.code.ts"
import {
  idsNaming,
  indexIn,
  standingById,
} from "../../../pages-system/indexes/index-reading.module.code.ts"
import {
  type Known,
  reaches,
  recordsIn,
} from "../../../pages-system/indexes/reaching.module.code.ts"
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

const PAGE_PROPERTY = "page-property"

const DECLARES = "page-property-slug"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

export type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export function propertyNamedIn(root: string, path: string): Named | null {
  if (!path.startsWith(INSIDE)) return null
  const said = namedIn(path)
  if (said === null) return null
  if (!kindsUnder(root, PAGE_PROPERTY).has(said.tail)) return null
  return { pageTypeSlug: said.tail, slug: said.stem }
}

export function declaredIn(value: Value | null): readonly string[] {
  const held = value === null ? null : value[DECLARED]
  if (held === null || held === undefined) return []
  const found: string[] = []
  for (const one of recordsIn(held)) {
    const said = textAt(one, SAID)
    if (said !== null) found.push(said)
  }
  return found
}

export function declaredAcross(carried: readonly Carried[], known: Known): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of carried) {
    for (const said of declaredIn(one.value)) {
      const reached = reaches(said, PAGE_PROPERTY, known)
      if ("id" in reached) found.add(reached.id)
    }
  }
  return found
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
    const after = new Set(declaredIn(one.value))
    for (const said of declaredIn(before)) {
      if (after.has(said)) continue
      const reached = reaches(said, PAGE_PROPERTY, known)
      if (!("id" in reached)) continue
      const standing = known.byId(reached.id)
      if (standing !== null) found.push({ path: standing.path, id: reached.id, shown: said })
    }
  }
  return found
}

export function declaredInIndex(leaving: Leaving, id: string): boolean {
  const touched = new Set(leaving.changed)
  for (const namer of idsNaming(leaving.root, id, DECLARES)) {
    const one = standingById(leaving.root, namer)
    if (one !== null && !touched.has(one.path)) return true
  }
  return false
}

function reasonFor(shown: string): string {
  return (
    `no page type declares \`${shown}\` among its properties — a page property stands ` +
    `in the parts tree and the properties tree both, and one holding it in only the ` +
    `first is a property no page can ever carry`
  )
}

export function propertyIsDeclaredByAType(leaving: Leaving): readonly Judged[] {
  const carried = carriedBy(leaving, pageTypesIn(indexIn(leaving.root)))
  const known = knownAcross(leaving, carried)
  const declared = declaredAcross(carried, known)
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): void => {
    if (judged.has(path)) return
    judged.add(path)
    if (declared.has(id) || declaredInIndex(leaving, id)) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of leaving.changed) {
    if (leaving.at(path) === null) continue
    const held = propertyNamedIn(leaving.root, path)
    if (held === null) continue
    const found = known.at(held.pageTypeSlug, held.slug)
    const one = found[0]
    if (found.length !== 1 || one === undefined) {
      throw new Error(
        `the index answers ${found.length} pages to the ${held.pageTypeSlug} slug ` +
          `\`${held.slug}\`, so what declares it could not be looked up`
      )
    }
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  for (const one of droppedBy(leaving, carried, known)) judge(one.path, one.id, one.shown)
  return said
}
