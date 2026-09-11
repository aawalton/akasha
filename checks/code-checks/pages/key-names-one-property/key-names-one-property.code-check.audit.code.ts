import {
  everyDeclarer,
  refusalsOver,
} from "akasha/checks/code-checks/pages/key-names-one-property/key-names-one-property.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function keyNamesOneProperty(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return refusalsOver(everyDeclarer(shadow), shadow)
}
