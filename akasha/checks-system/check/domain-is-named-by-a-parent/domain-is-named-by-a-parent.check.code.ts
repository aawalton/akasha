import { idsNaming, standingAt } from "../../../pages-system/index/index-reading.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name.module.code.ts"
import { kindsUnder } from "../../../pages-system/page-type/page-type-descent.module.code.ts"
import type { Body } from "../../checking.module.code.ts"
import { overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const INSIDE = "akasha/"

const DOMAIN = "domain"

const PART_SLUGS = "part-slugs"

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

export function reasonsIn(given: Body): readonly string[] {
  const named = domainNamedIn(given.root, given.path)
  if (named === null) return []
  if (named.pageTypeSlug === DOMAIN && named.slug === THE_WHOLE) return []
  const standing = standingAt(given.root, named.pageTypeSlug, named.slug)
  const one = standing[0]
  if (standing.length !== 1 || one === undefined) {
    throw new Error(
      `the index answers ${standing.length} pages to the ${named.pageTypeSlug} slug ` +
        `\`${named.slug}\`, so who names it could not be looked up`
    )
  }
  if (idsNaming(given.root, one.id, PART_SLUGS).length > 0) return []
  return [
    `no page names \`${named.pageTypeSlug}/${named.slug}\` among its parts — every page ` +
      `standing under \`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of a page above it`,
  ]
}

export function domainIsNamedByAParent(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
