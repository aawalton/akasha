import {
  judgingBy,
  PROPERTY,
} from "akasha/check/code/pages/property-sits-under-the-page-it-is-a-part-of/property-sits-under-the-page-it-is-a-part-of.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export function propertySitsUnderThePageItIsAPartOf(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const judging = judgingBy(commit, commit.index.knownIn())
  const under = commit.index.kindsUnder(PROPERTY)
  const said: Judged[] = []
  for (const kind of under) {
    for (const listed of commit.index.everyOfType(kind)) {
      const held = namedUnder(listed.path, under)
      if (held === null) continue
      const shown = namedAs(held.pageTypeSlug, held.slug, null)
      const reason = judging(listed.id, shown, listed.path)
      if (reason !== null) said.push({ path: listed.path, reason })
    }
  }
  return said
}
