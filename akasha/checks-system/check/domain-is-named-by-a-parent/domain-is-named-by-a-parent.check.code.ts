import {
  pageTypesIn,
  type Value,
  valueIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  idsNaming,
  standingByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  knownIn,
  namesIn,
  reaches,
} from "../../../pages-system/indexes/reaching/reaching.module.code.ts"
import {
  namedIn,
  pageNamed,
} from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { kindsUnder } from "../../../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import { shadowFor } from "../../../pages-system/shadow/shadow.module.code.ts"
import { bodyOf } from "../../checking/checking.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

const DOMAIN = "domain"

const PART_SLUGS = "part-slugs"

const PARTS = "partSlugs"

const THE_WHOLE = "akasha-system"

export type Named = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export function domainNamedIn(
  root: string,
  path: string,
  under: ReadonlySet<string> = kindsUnder(root, DOMAIN)
): Named | null {
  if (!path.startsWith(INSIDE)) return null
  const said = namedIn(path)
  if (said === null) return null
  if (!under.has(said.tail)) return null
  return { pageTypeSlug: said.tail, slug: said.stem }
}

function theWhole(path: string): boolean {
  const said = namedIn(path)
  return said !== null && said.tail === DOMAIN && said.stem === THE_WHOLE
}

function partsOf(value: Value | null): readonly string[] {
  const held = value === null ? null : value[PARTS]
  return held === null || held === undefined ? [] : namesIn(held)
}

function partsWere(leaving: Leaving, path: string): readonly string[] {
  const bytes = leaving.was(path)
  if (bytes === null) return []
  const text = bodyOf({ root: leaving.root, path, bytes })
  return text === null ? [] : partsOf(valueIn(text))
}

function reasonFor(shown: string): string {
  return (
    `no page names \`${shown}\` among its parts — every page standing under ` +
    `\`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of a page above it`
  )
}

export function domainIsNamedByAParent(leaving: Leaving): readonly Judged[] {
  const cast = shadowFor(leaving)
  if ("refused" in cast) throw new Error(cast.refused)
  const shadow = cast.shadow
  const under = kindsUnder(leaving.root, DOMAIN, shadow.reading, shadow.pageOf)
  const pageTypes = pageTypesIn(shadow.reading)
  const known = knownIn(shadow.reading, leaving.root, shadow.pageOf)
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    if (idsNaming(shadow.reading, id, PART_SLUGS).length > 0) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of leaving.changed) {
    if (!path.startsWith(INSIDE) || !pageNamed(path, pageTypes)) continue
    for (const shown of partsWere(leaving, path)) {
      const reached = reaches(shown, DOMAIN, known)
      if (!("id" in reached)) continue
      const standing = known.byId(reached.id)
      if (standing === null || theWhole(standing.path)) continue
      judge(standing.path, reached.id, shown)
    }
    if (leaving.at(path) === null) continue
    const held = domainNamedIn(leaving.root, path, under)
    if (held === null || (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE)) continue
    const one = standingByPath(shadow.reading, path).find((filed) => filed.path === path)
    if (one === undefined) continue
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}
