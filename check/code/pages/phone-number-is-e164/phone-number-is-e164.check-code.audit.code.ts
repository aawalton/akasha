import {
  refusalsOver,
  typesCarryingOne,
} from "akasha/check/code/pages/phone-number-is-e164/phone-number-is-e164.check-code.decision.code.ts"
import { pagesTypedIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function phoneNumberIsE164(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return refusalsOver(pagesTypedIn(root, typesCarryingOne(shadow)), shadow)
}
