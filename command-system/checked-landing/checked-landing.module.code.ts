import { type Held, landingAsked, wroteAndTook } from "../asking/asking.module.code.ts"
import type { Answer, Kind } from "../calling/calling.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"

export const CHECKED: Kind = {
  slug: "change-checked",
  runsChecks: true,
  runsWarrants: false,
}

export async function landedChecked(
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string,
  unmoved: readonly Held[] = []
): Promise<Answer> {
  return await landingAsked(
    { root, calledAs, from: root, writer: null, agentId: null, changeKind: CHECKED },
    { changes, message, dryRun: false, glass: null, unmoved, saying: wroteAndTook }
  )
}
