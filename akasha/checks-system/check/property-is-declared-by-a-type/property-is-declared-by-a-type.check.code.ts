import {
  pageTypesIn,
  textAt,
  type Value,
  valueIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  idsNaming,
  standingAt,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { shadowFor } from "../../../pages-system/indexes/index-shadow/index-shadow.module.code.ts"
import {
  knownIn,
  reaches,
  recordsIn,
} from "../../../pages-system/indexes/reaching/reaching.module.code.ts"
import {
  namedIn,
  pageNamed,
} from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { kindsUnder } from "../../../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import { bodyOf } from "../../checking/checking.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

const PAGE_PROPERTY = "page-property"

const DECLARES = "page-property-slug"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

export type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export function propertyNamedIn(
  root: string,
  path: string,
  under: ReadonlySet<string> = kindsUnder(root, PAGE_PROPERTY)
): Named | null {
  if (!path.startsWith(INSIDE)) return null
  const said = namedIn(path)
  if (said === null) return null
  if (!under.has(said.tail)) return null
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

function declaredWere(leaving: Leaving, path: string): readonly string[] {
  const bytes = leaving.was(path)
  if (bytes === null) return []
  const text = bodyOf({ root: leaving.root, path, bytes })
  return text === null ? [] : declaredIn(valueIn(text))
}

function reasonFor(shown: string): string {
  return (
    `no page type declares \`${shown}\` among its properties — a page property stands ` +
    `in the parts tree and the properties tree both, and one holding it in only the ` +
    `first is a property no page can ever carry`
  )
}

export function propertyIsDeclaredByAType(leaving: Leaving): readonly Judged[] {
  const cast = shadowFor(leaving)
  if ("refused" in cast) throw new Error(cast.refused)
  const shadow = cast.shadow
  const under = kindsUnder(leaving.root, PAGE_PROPERTY, shadow.reading, shadow.pageOf)
  const pageTypes = pageTypesIn(shadow.reading)
  const known = knownIn(shadow.reading, leaving.root, shadow.pageOf)
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): void => {
    if (judged.has(path)) return
    judged.add(path)
    if (idsNaming(shadow.reading, id, DECLARES).length > 0) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of leaving.changed) {
    if (!path.startsWith(INSIDE) || !pageNamed(path, pageTypes)) continue
    for (const shown of declaredWere(leaving, path)) {
      const reached = reaches(shown, PAGE_PROPERTY, known)
      if (!("id" in reached)) continue
      const standing = known.byId(reached.id)
      if (standing === null) continue
      judge(standing.path, reached.id, shown)
    }
    if (leaving.at(path) === null) continue
    const held = propertyNamedIn(leaving.root, path, under)
    if (held === null) continue
    const found = standingAt(shadow.reading, held.pageTypeSlug, held.slug)
    const one = found[0]
    if (found.length !== 1 || one === undefined) continue
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}
