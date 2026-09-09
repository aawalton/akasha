import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { landingAsked, MECHANICAL, wroteAndTook } from "../asking/asking.module.code.ts"
import type { Answer } from "../calling/calling.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"

export async function landedMechanically(
  root: string,
  calledAs: string,
  changes: readonly FileChange[],
  message: string
): Promise<Answer> {
  return await landingAsked(
    { root, calledAs, from: root, writer: null, agentId: null, changeKind: MECHANICAL },
    {
      changes,
      message,
      dryRun: false,
      glass: null,
      read: baseOf(root),
      saying: wroteAndTook,
      draft: false,
    }
  )
}
