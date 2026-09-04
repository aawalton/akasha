import { namesIn, reaches } from "@akasha/indexes/reaching"
import type { Change } from "@akasha/pages-system/change"
import { namedUnder, pageNamed, partedIn } from "@akasha/pages-system/page-file-name"
import { type Value, valueIn } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { bodyOf, input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const DOMAIN = "domain"

const PART_SLUGS = "part-slugs"

const PARTS = "partSlugs"

const THE_WHOLE = "akasha"

function theWhole(path: string): boolean {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return false
  return said.pageType === DOMAIN && said.slug === THE_WHOLE
}

function partsOf(value: Value | null): readonly string[] {
  const held = value === null ? null : value[PARTS]
  return held === null || held === undefined ? [] : namesIn(held)
}

function partsWere(change: Change, path: string): readonly string[] {
  const bytes = change.before(path)
  if (bytes === null) return []
  return partsOf(valueIn(bodyOf({ root: change.root, path, bytes })))
}

function reasonFor(shown: string): string {
  return (
    `no page names \`${shown}\` among its parts — every page standing under ` +
    `\`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of a page above it`
  )
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(DOMAIN)
  const pageTypes = shadow.index.pageTypesIn()
  const known = shadow.index.knownIn()
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    if (shadow.index.idsNaming(id, PART_SLUGS).length > 0) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    for (const shown of partsWere(change, path)) {
      const reached = reaches(shown, DOMAIN, known)
      if (!("id" in reached)) continue
      const listed = known.byId(reached.id)
      if (listed === null || theWhole(listed.path)) continue
      judge(listed.path, reached.id, shown)
    }
    if (change.after(path) === null) continue
    const held = namedUnder(path, under)
    if (held === null || (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE)) continue
    const one = shadow.index.listedByPath(path).find((filed) => filed.path === path)
    if (one === undefined) continue
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}

export const domainIsNamedByAParent = input(PAGES, refusalsIn)
