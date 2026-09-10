import { shadowAt } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  everyType,
  refusalsOver,
  sourceOf,
} from "./introduced-property-is-a-part.code-check.decision.code.ts"

export function introducedPropertyIsAPart(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const types = everyType(shadow, [])
  return refusalsOver(types, sourceOf(types, shadow.index.sourceIn()))
}
