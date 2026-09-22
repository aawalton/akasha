import {
  ADDRESS,
  keyingIn,
  reasonsIn,
} from "akasha/check/code/pages/email-address-is-well-formed/email-address-is-well-formed.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function emailAddressIsWellFormed(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const keying = keyingIn(commit.index.kindsUnder(ADDRESS), commit)
  const said: Judged[] = []
  for (const pageTypeSlug of commit.index.pageTypesIn()) {
    for (const [path, value] of commit.index.valuesByPath(pageTypeSlug)) {
      said.push(...reasonsIn(path, value, keying))
    }
  }
  return said
}
