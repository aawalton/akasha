import {
  ADDRESS,
  keyingIn,
  reasonsIn,
} from "akasha/checks/code-checks/pages/email-address-is-well-formed/email-address-is-well-formed.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { everyPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function emailAddressIsWellFormed(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const pageTypes = shadow.index.pageTypesIn()
  const keying = keyingIn(shadow.index.kindsUnder(ADDRESS), shadow)
  const said: Judged[] = []
  for (const path of everyPath(root)) {
    if (!pageNamed(path, pageTypes)) continue
    const value = shadow.pageOf(path)
    if (value === null) continue
    said.push(...reasonsIn(path, value, keying))
  }
  return said
}
