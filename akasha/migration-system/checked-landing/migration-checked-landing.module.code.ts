import { landedMechanically } from "@akasha/command-system/asking"
import { landedChecked } from "@akasha/command-system/checked-landing"
import type { Composed, Landing } from "../landing/migration-landing.module.code.ts"

export function takesAway(composed: readonly Composed[]): boolean {
  return composed.some((one) => one.body === null)
}

export function landingFor(composed: readonly Composed[]): Landing {
  return takesAway(composed) ? landedChecked : landedMechanically
}
