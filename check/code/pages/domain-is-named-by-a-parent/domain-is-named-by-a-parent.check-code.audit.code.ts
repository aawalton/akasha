import {
  DOMAIN,
  judgingBy,
  THE_WHOLE,
} from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Shadow, shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

function pagesUnder(shadow: Shadow, under: ReadonlySet<string>): readonly string[] {
  const found = new Set<string>()
  for (const kind of under) {
    for (const one of shadow.index.everyOfType(kind)) found.add(one.path)
  }
  return [...found].sort()
}

export function domainIsNamedByAParent(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const under = shadow.index.kindsUnder(DOMAIN)
  const judging = judgingBy(shadow)
  const said: Judged[] = []
  for (const path of pagesUnder(shadow, under)) {
    const held = namedUnder(path, under)
    if (held === null || (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE)) continue
    const page = shadow.pageOf(path)
    const id = page === null ? null : textAt(page, ID)
    if (id === null) continue
    const reason = judging(id, `${held.pageTypeSlug}/${held.slug}`)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}
