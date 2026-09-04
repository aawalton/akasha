import { reaches, recordsIn } from "@akasha/indexes/reaching"
import type { Change } from "@akasha/pages-system/change"
import { namedUnder, pageNamed } from "@akasha/pages-system/page-file-name"
import { textAt, textsAt, type Value, valueIn } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { bodyOf, input, PAGES } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const INSIDE = "akasha/"

const PAGE_PROPERTY = "page-property"

const DECLARES = ["page-property-slug", "member-slugs"] as const

const DECLARED = "properties"

const MEMBERS = "memberSlugs"

const SAID = "pagePropertySlug"

export function declaredIn(value: Value | null): readonly string[] {
  if (value === null) return []
  const found: string[] = []
  const held = value[DECLARED]
  if (held !== null && held !== undefined) {
    for (const one of recordsIn(held)) {
      const said = textAt(one, SAID)
      if (said !== null) found.push(said)
    }
  }
  found.push(...(textsAt(value, MEMBERS) ?? []))
  return found
}

function declaredWere(change: Change, path: string): readonly string[] {
  const bytes = change.before(path)
  if (bytes === null) return []
  return declaredIn(valueIn(bodyOf({ root: change.root, path, bytes })))
}

function reasonFor(shown: string): string {
  return (
    `no page type declares \`${shown}\` among its properties — a page property stands ` +
    `in the parts tree and the properties tree both, and one holding it in only the ` +
    `first is a property no page can ever carry`
  )
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = shadow.index.kindsUnder(PAGE_PROPERTY)
  const pageTypes = shadow.index.pageTypesIn()
  const known = shadow.index.knownIn()
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    if (DECLARES.some((slug) => shadow.index.idsNaming(id, slug).length > 0)) return
    said.push({ path, reason: reasonFor(shown) })
  }
  for (const path of change.changed) {
    if (!path.startsWith(INSIDE) || !pageNamed(path, pageTypes)) continue
    for (const shown of declaredWere(change, path)) {
      const reached = reaches(shown, PAGE_PROPERTY, known)
      if (!("id" in reached)) continue
      const listed = known.byId(reached.id)
      if (listed === null) continue
      judge(listed.path, reached.id, shown)
    }
    if (change.after(path) === null) continue
    const held = namedUnder(path, under)
    if (held === null) continue
    const one = shadow.index.listedByPath(path).find((filed) => filed.path === path)
    if (one === undefined) continue
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}

export const propertyIsDeclaredByAType = input(PAGES, refusalsIn)
