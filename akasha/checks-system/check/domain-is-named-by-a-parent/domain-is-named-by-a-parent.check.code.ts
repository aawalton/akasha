import { idsNaming, standingAt } from "../../../data-system/index/index-reading.module.code.ts"
import type { Body } from "../../checking.module.code.ts"
import { overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const NAMED = /^(.+)\.([a-z0-9-]+)\.ts$/

const INSIDE = "akasha/"

const DOMAIN = "domain"

const PART_SLUGS = "part-slugs"

const THE_WHOLE = "akasha-system"

export function domainSlugOf(path: string): string | null {
  if (!path.startsWith(INSIDE)) return null
  const name = path.slice(path.lastIndexOf("/") + 1)
  const said = NAMED.exec(name)
  if (said === null) return null
  const stem = said[1]
  if (stem === undefined || said[2] !== DOMAIN) return null
  return stem
}

export function reasonsIn(given: Body): readonly string[] {
  const slug = domainSlugOf(given.path)
  if (slug === null || slug === THE_WHOLE) return []
  const standing = standingAt(given.root, DOMAIN, slug)
  const one = standing[0]
  if (standing.length !== 1 || one === undefined) {
    throw new Error(
      `the index answers ${standing.length} pages to the domain slug \`${slug}\`, so who names it ` +
        "could not be looked up"
    )
  }
  if (idsNaming(given.root, one.id, PART_SLUGS).length > 0) return []
  return [
    `no page names \`domain/${slug}\` among its parts — every domain but \`${THE_WHOLE}\` is a ` +
      "part of a domain above it",
  ]
}

export function domainIsNamedByAParent(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
