import {
  DOMAIN,
  judgingBy,
  THE_WHOLE,
} from "akasha/checks/code-checks/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { everyPath } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { namedUnder } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

export function domainIsNamedByAParent(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const under = shadow.index.kindsUnder(DOMAIN)
  const judging = judgingBy(shadow)
  const said: Judged[] = []
  for (const path of everyPath(root)) {
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
