import { shadowAt } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { everyDeclarer, refusalsOver } from "./key-names-one-property.code-check.decision.code.ts"

export function keyNamesOneProperty(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  return refusalsOver(everyDeclarer(shadow), shadow)
}
