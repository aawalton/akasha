import type { Held } from "../asking/asking.module.code.ts"
import { landingAsked, MECHANICAL, wroteAndTook } from "../asking/asking.module.code.ts"
import type { Answer } from "../calling/calling.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"

export async function landedMechanically(
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string,
  unmoved: readonly Held[] = [],
  agentId: string | null = null
): Promise<Answer> {
  return await landingAsked(
    { root, calledAs, from: root, writer: null, agentId, changeKind: MECHANICAL },
    {
      changes,
      message,
      dryRun: false,
      glass: null,
      unmoved,
      saying: wroteAndTook,
      draft: agentId !== null,
    }
  )
}
