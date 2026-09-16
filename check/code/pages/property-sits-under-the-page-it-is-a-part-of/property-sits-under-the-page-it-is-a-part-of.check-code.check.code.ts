import {
  DOMAIN,
  partsOf,
} from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import {
  judgingBy,
  PROPERTY,
} from "akasha/check/code/pages/property-sits-under-the-page-it-is-a-part-of/property-sits-under-the-page-it-is-a-part-of.check-code.decision.code.ts"
import { input, pagesBy } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { filedById, reaches } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { namedUnder, pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

const kindsHeld = new WeakMap<Shadow, Map<string, ReadonlySet<string>>>()

function kindsFor(shadow: Shadow, slug: string): ReadonlySet<string> {
  const held = kindsHeld.get(shadow) ?? new Map<string, ReadonlySet<string>>()
  kindsHeld.set(shadow, held)
  const found = held.get(slug)
  if (found !== undefined) return found
  const made = shadow.index.kindsUnder(slug)
  held.set(slug, made)
  return made
}

function movesAProperty(path: string, shadow: Shadow): boolean {
  return namedUnder(path, kindsFor(shadow, DOMAIN)) !== null
}

const MOVES_A_PROPERTY = pagesBy("pages that can move a property", movesAProperty)

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = kindsFor(shadow, PROPERTY)
  const pageTypes = shadow.index.pageTypesIn()
  const known = shadow.index.knownIn()
  const judging = judgingBy(shadow, known)
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (at: string, id: string, shown: string): undefined => {
    if (judged.has(at)) return
    judged.add(at)
    const reason = judging(id, shown, at)
    if (reason !== null) said.push({ path: at, reason })
  }
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const page = shadow.pageOf(path)
    if (page === null) continue
    for (const shown of partsOf(page)) {
      const reached = reaches(shown, DOMAIN, known)
      if (!("id" in reached)) continue
      const listed = filedById(known, reached.id)
      if (listed === null || namedUnder(listed.path, under) === null) continue
      judge(listed.path, reached.id, shown)
    }
    if (change.after(path) === null) continue
    const held = namedUnder(path, under)
    const id = textAt(page, ID)
    if (held === null || id === null) continue
    judge(path, id, namedAs(held.pageTypeSlug, held.slug, null))
  }
  return said
}

export const propertySitsUnderThePageItIsAPartOf = input(MOVES_A_PROPERTY, refusalsIn)
