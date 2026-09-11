import {
  DOMAIN,
  judgingBy,
  partsOf,
  THE_WHOLE,
  theWhole,
} from "akasha/checks/code-checks/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.code-check.decision.code.ts"
import type {
  Paged,
  Selector,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  input,
  PAGES,
  textWas,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { namedUnder, pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { filedById, reaches } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"

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

const UNDER_DOMAIN: Selector<Paged> = {
  named: "pages under domain",
  isInput: (path, shadow) => PAGES.isInput(path, shadow) && underDomain(path, shadow),
  from: (change, shadow) =>
    PAGES.from(change, shadow).filter((one) => underDomain(one.path, shadow)),
}

function partsWere(change: Change, path: string): readonly string[] {
  const text = textWas(change, path)
  if (text === null) return []
  return partsOf(valueIn(text))
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const under = kindsFor(shadow)
  const pageTypes = shadow.index.pageTypesIn()
  const known = shadow.index.knownIn()
  const judging = judgingBy(shadow)
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
    const one = shadow.index.listedByPath(path).find((filed) => filed.path === path)
    if (one === undefined) continue
    judge(path, one.id, `${held.pageTypeSlug}/${held.slug}`)
  }
  return said
}

export const domainIsNamedByAParent = input(UNDER_DOMAIN, refusalsIn)
