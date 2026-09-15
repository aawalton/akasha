import {
  everyDeclarer,
  refusalsOver,
} from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function keyNamesOneProperty(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return refusalsOver(everyDeclarer(shadow), shadow)
}
