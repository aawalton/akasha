import {
  DOMAIN,
  type Judging,
  judgingBy,
  partsOf,
  THE_WHOLE,
  theWhole,
} from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import {
  input,
  pagesBy,
  textWas,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { filedById, reaches } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { namedUnder, pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

const kindsHeld = new WeakMap<Shadow, ReadonlySet<string>>()

function kindsFor(shadow: Shadow): ReadonlySet<string> {
  const held = kindsHeld.get(shadow)
  if (held !== undefined) return held
  const found = shadow.index.kindsUnder(DOMAIN)
  kindsHeld.set(shadow, found)
  return found
}

function underDomain(path: string, shadow: Shadow): boolean {
  return namedUnder(path, kindsFor(shadow)) !== null
}

export const UNDER_DOMAIN = pagesBy("pages under domain", underDomain)

function partsWere(change: Change, path: string): readonly string[] {
  const text = textWas(change, path)
  if (text === null) return []
  return partsOf(valueIn(text))
}

export function judgedOver(
  change: Change,
  shadow: Shadow,
  judgingOf: (given: Shadow) => Judging
): readonly Judged[] {
  const under = kindsFor(shadow)
  const pageTypes = shadow.index.pageTypesIn()
  const known = shadow.index.knownIn()
  const judging = judgingOf(shadow)
  const said: Judged[] = []
  const judged = new Set<string>()
  const judge = (path: string, id: string, shown: string): undefined => {
    if (judged.has(path)) return
    judged.add(path)
    const reason = judging(id, shown)
    if (reason !== null) said.push({ path, reason })
  }
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    for (const shown of partsWere(change, path)) {
      const reached = reaches(shown, DOMAIN, known)
      if (!("id" in reached)) continue
      const listed = filedById(known, reached.id)
      if (listed === null || theWhole(listed.path)) continue
      judge(listed.path, reached.id, shown)
    }
    if (change.after(path) === null) continue
    const held = namedUnder(path, under)
    if (held === null || (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE)) continue
    const page = shadow.pageOf(path)
    const id = page === null ? null : textAt(page, ID)
    if (id === null) continue
    judge(path, id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  return judgedOver(change, shadow, judgingBy)
}

export const domainIsNamedByAParent = input(UNDER_DOMAIN, refusalsIn)
