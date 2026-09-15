import {
  everyType,
  refusalsOver,
  sourceOf,
} from "akasha/check/code/pages/introduced-property-is-a-part/introduced-property-is-a-part.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function introducedPropertyIsAPart(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const types = everyType(shadow, [])
  return refusalsOver(types, sourceOf(types, shadow.index.sourceIn()))
}
