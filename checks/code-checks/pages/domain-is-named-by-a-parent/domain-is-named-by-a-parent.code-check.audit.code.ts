import { everyPath } from "@akasha/indexes"
import { namedUnder } from "@akasha/pages/page-file-name"
import { shadowAt } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  DOMAIN,
  judgingBy,
  THE_WHOLE,
} from "./domain-is-named-by-a-parent.code-check.decision.code.ts"

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
