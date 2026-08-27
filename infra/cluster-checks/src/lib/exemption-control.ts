import { assertNever } from "@shared/utils-narrow/assert-never"

export const CONTROLLED_EXEMPTION_SETS = ["shim-allowlist", "color-literal-allowlist"] as const

export type ControlledExemptionSet = (typeof CONTROLLED_EXEMPTION_SETS)[number]

export const EXEMPTION_CONTROL_VIOLATIONS = [
  "population-miscounted",
  "grant-widened",
  "control-dead",
] as const

export type ExemptionControlViolation = (typeof EXEMPTION_CONTROL_VIOLATIONS)[number]

export interface ExemptionControlReport {
  readonly kind: ExemptionControlViolation
  readonly set: ControlledExemptionSet
  readonly entry?: string
  readonly message: string
}

export interface ExemptionControlSpec<T> {
  readonly id: ControlledExemptionSet
  readonly entries: readonly T[]
  readonly declaredSize: number
  readonly describe: (entry: T) => string
  readonly suppressed: (entry: T) => readonly unknown[]
  readonly withdrawn: (entry: T) => readonly unknown[]
}

function message(kind: ExemptionControlViolation, set: string, entry: string): string {
  switch (kind) {
    case "population-miscounted":
      return `${set}: the set and its declared size disagree. A size held by equality is what separates a set that is empty ON PURPOSE from one that quietly emptied; while they disagree, neither reading is available and no per-entry assertion below vouches for anything.`
    case "grant-widened":
      return `${set}: the rule FIRED on the exempted entry ${entry}. The exemption did not withhold — either the grant no longer covers this input or the rule started matching something it should not.`
    case "control-dead":
      return `${set}: the control for ${entry} is DEAD — with the exemption withdrawn the rule still reports nothing, so this entry is no longer detectable and its green says nothing about whether the exemption held. Re-point the entry at an input the rule can still see, or remove it: an exemption that suppresses nothing is dead code.`
    default:
      return assertNever(kind)
  }
}

export function checkExemptionControl<T>(
  spec: ExemptionControlSpec<T>
): readonly ExemptionControlReport[] {
  const reports: ExemptionControlReport[] = []

  if (spec.entries.length !== spec.declaredSize) {
    reports.push({
      kind: "population-miscounted",
      set: spec.id,
      message: `${message("population-miscounted", spec.id, "")} Counted ${spec.entries.length}, declared ${spec.declaredSize}.`,
    })
    return reports
  }

  for (const entry of spec.entries) {
    const named = spec.describe(entry)
    if (spec.suppressed(entry).length > 0) {
      reports.push({
        kind: "grant-widened",
        set: spec.id,
        entry: named,
        message: message("grant-widened", spec.id, named),
      })
    }
    if (spec.withdrawn(entry).length === 0) {
      reports.push({
        kind: "control-dead",
        set: spec.id,
        entry: named,
        message: message("control-dead", spec.id, named),
      })
    }
  }

  return reports
}

export function renderExemptionControlCensus<T>(spec: ExemptionControlSpec<T>): string {
  return `${spec.id}: ${spec.entries.length} entry(ies) controlled, each asserted silent under the exemption and firing without it.`
}
