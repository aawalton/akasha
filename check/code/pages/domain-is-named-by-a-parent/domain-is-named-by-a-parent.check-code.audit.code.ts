import {
  DOMAIN,
  type Judging,
  judgingBy,
  THE_WHOLE,
} from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.decision.code.ts"
import { commitIn, type Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ID = "id"

function pagesUnder(paged: Paged, under: ReadonlySet<string>): readonly string[] {
  const found = new Set<string>()
  for (const kind of under) {
    for (const one of paged.index.everyOfType(kind)) found.add(one.path)
  }
  return [...found].sort()
}

export function auditedOver(root: string, judgingOf: (paged: Paged) => Judging): readonly Judged[] {
  const commit = commitIn(root)
  const under = commit.index.kindsUnder(DOMAIN)
  const judging = judgingOf(commit)
  const said: Judged[] = []
  for (const path of pagesUnder(commit, under)) {
    const held = namedUnder(path, under)
    if (held === null || (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE)) continue
    const page = commit.pageOf(path)
    const id = page === null ? null : textAt(page, ID)
    if (id === null) continue
    const reason = judging(id, `${held.pageTypeSlug}/${held.slug}`)
    if (reason !== null) said.push({ path, reason })
  }
  return said
}

export function domainIsNamedByAParent(root: string): readonly Judged[] {
  return auditedOver(root, judgingBy)
}
