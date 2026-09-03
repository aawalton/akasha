export const DECLARATION_RELATIVE_PATH = "tools/lib/subagent-guard.ts"

export const SUBAGENT_REJECT_BASES = ["subagents-working"] as const

export type SubagentRejectBasis = (typeof SUBAGENT_REJECT_BASES)[number]

export interface StandingSubagent {
  readonly name: string
  readonly dispatchedAs: string
}

export interface SubagentGuardInput {
  readonly standing: readonly StandingSubagent[]
  readonly targetLive: boolean
  readonly force: boolean
  readonly seatName: string
  readonly act: string
}

export const SUBAGENT_GUARD_DECISIONS = ["allow", "reject"] as const

export type SubagentGuardDecisionKind = (typeof SUBAGENT_GUARD_DECISIONS)[number]

export type SubagentGuardDecision =
  | { kind: "allow" }
  | { kind: "reject"; basis: SubagentRejectBasis; reason: string }

function countedKinds(standing: readonly StandingSubagent[]): string {
  const kinds = [...new Set(standing.map((one) => one.dispatchedAs))].sort()
  return kinds.join(", ")
}

export function decideSubagentGuard(input: SubagentGuardInput): SubagentGuardDecision {
  if (!input.targetLive) return { kind: "allow" }
  if (input.standing.length === 0) return { kind: "allow" }
  if (input.force) return { kind: "allow" }

  const many = input.standing.length !== 1
  return {
    kind: "reject",
    basis: "subagents-working",
    reason:
      `agent '${input.seatName}' has ${String(input.standing.length)} subagent${many ? "s" : ""} ` +
      `working (${countedKinds(input.standing)}). ${input.act} it ends ${many ? "them" : "it"}, ` +
      `and nothing will report what ${many ? "they were" : "it was"} doing. Wait for ` +
      `${many ? "them" : "it"} to return, or pass --force to end ${many ? "them" : "it"} with the seat`,
  }
}
