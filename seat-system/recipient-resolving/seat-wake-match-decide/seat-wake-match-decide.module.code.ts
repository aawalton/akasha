import { type CommsInput, type CommsRule, ruleMatches } from "@akasha/seat-system/seat-wake-rules"

export type WakeMatchDecision =
  | { readonly kind: "revive"; readonly reason: string }
  | { readonly kind: "no-op"; readonly reason: string }

export type SeatWakeVerdict =
  | { readonly kind: "not-armed" }
  | { readonly kind: "armed-matched"; readonly ruleId: string }
  | { readonly kind: "armed-unmatched"; readonly declared: readonly string[] }

export interface SeatWakeInput {
  readonly wakeSources: readonly CommsRule[] | null
  readonly comms: CommsInput
}

export function decideSeatWake(input: SeatWakeInput): SeatWakeVerdict {
  if (input.wakeSources === null) return { kind: "not-armed" }
  const hit = input.wakeSources.find((rule) => ruleMatches(rule, input.comms))
  if (hit !== undefined) return { kind: "armed-matched", ruleId: hit.id }
  return {
    kind: "armed-unmatched",
    declared: input.wakeSources.map((rule) => rule.senderMatch),
  }
}

export interface WakeMatchInput {
  readonly seatIsAbsent: boolean
  readonly comms: CommsInput
  readonly wakeSources: readonly CommsRule[]
}

export function decideWakeMatch(input: WakeMatchInput): WakeMatchDecision {
  if (!input.seatIsAbsent) {
    return {
      kind: "no-op",
      reason: "the seat's page stands, so an agent is in it — no wake needed",
    }
  }
  const seat = decideSeatWake({ wakeSources: input.wakeSources, comms: input.comms })
  if (seat.kind !== "armed-matched") {
    return {
      kind: "no-op",
      reason: "the seat is absent, but no wakeSource matched the inbound work",
    }
  }
  return { kind: "revive", reason: "an absent seat + a matching wakeSource → revive" }
}
