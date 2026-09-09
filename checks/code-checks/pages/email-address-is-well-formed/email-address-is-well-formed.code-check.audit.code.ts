import { everyPath } from "@akasha/indexes"
import { pageNamed } from "@akasha/pages/page-file-name"
import { shadowAt } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  ADDRESS,
  keyingIn,
  reasonsIn,
} from "./email-address-is-well-formed.code-check.decision.code.ts"

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
