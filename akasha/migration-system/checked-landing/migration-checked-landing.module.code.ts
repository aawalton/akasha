import { landedMechanically, landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Kind } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import type { Composed, Landing } from "../landing/migration-landing.module.code.ts"

export const CHECKED: Kind = {
  slug: "change-checked",
  runsChecks: true,
  runsWarrants: false,
}

export function landedChecked(
  root: string,
  calledAs: string,
  changes: readonly FileEdit[],
  message: string
): Answer {
  return landingAsked(
    { root, calledAs, from: root, writer: null, agentId: null, changeKind: CHECKED },
    { changes, message, dryRun: false, glass: null, unmoved: [], saying: wroteAndTook }
  )
}

export function takesAway(composed: readonly Composed[]): boolean {
  return composed.some((one) => one.body === null)
}

export function landingFor(composed: readonly Composed[]): Landing {
  return takesAway(composed) ? landedChecked : landedMechanically
}
