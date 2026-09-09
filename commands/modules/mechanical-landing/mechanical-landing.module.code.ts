import type { Answer } from "../../../command-system/calling/calling.module.code.ts"
import { landingAsked, MECHANICAL, wroteAndTook } from "../asking/asking.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"
import { baseOf } from "../landing/landing.module.code.ts"

export async function landedMechanically(
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
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
