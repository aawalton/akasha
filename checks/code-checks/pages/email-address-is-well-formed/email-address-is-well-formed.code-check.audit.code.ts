import {
  ADDRESS,
  keyingIn,
  reasonsIn,
} from "akasha/checks/code-checks/pages/email-address-is-well-formed/email-address-is-well-formed.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"

export function emailAddressIsWellFormed(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const keying = keyingIn(shadow.index.kindsUnder(ADDRESS), shadow)
  const said: Judged[] = []
  for (const pageTypeSlug of shadow.index.pageTypesIn()) {
    for (const [path, value] of shadow.index.valuesByPath(pageTypeSlug)) {
      said.push(...reasonsIn(path, value, keying))
    }
  }
  return said
}
