import {
  DOMAIN,
  judgingBy,
  THE_WHOLE,
} from "akasha/checks/code-checks/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { namedUnder } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { everyPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function domainIsNamedByAParent(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const under = shadow.index.kindsUnder(DOMAIN)
  const judging = judgingBy(shadow)
  const said: Judged[] = []
  for (const path of everyPath(root)) {
    const held = namedUnder(path, under)
    if (held === null || (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE)) continue
    const one = shadow.index.listedByPath(path).find((filed) => filed.path === path)
    if (one === undefined) continue
    const reason = judging(one.id, `${held.pageTypeSlug}/${held.slug}`)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}
