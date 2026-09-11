import {
  everyType,
  refusalsOver,
  sourceOf,
} from "akasha/checks/code-checks/pages/introduced-property-is-a-part/introduced-property-is-a-part.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function introducedPropertyIsAPart(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const types = everyType(shadow, [])
  return refusalsOver(types, sourceOf(types, shadow.index.sourceIn()))
}
