import type { ReviveVerifySignal } from "@akasha/seat-system/seat-revive-verify-signal"
import type { CommsInput, OnDemandAgentSpec } from "@tools/lib/decide-wake-match"

export interface RecipientResolverAgentRow {
  readonly id: string
}

export interface RecipientResolverTickDeps {
  readonly specs: readonly OnDemandAgentSpec[]
  readonly resolveAgent: (name: string) => Promise<RecipientResolverAgentRow | null>
  readonly readInbound: (agentId: string) => Promise<readonly CommsInput[]>
  readonly revive: (agentId: string, bootPrompt: string | undefined) => Promise<ReviveVerifySignal>
  readonly reportUnrevivable: (
    name: string,
    agentId: string,
    tellSeat: string | null
  ) => Promise<void>
  readonly seatIsPresent: (agentId: string) => Promise<boolean>
  readonly perSpecTimeoutMs?: number
  readonly signal: AbortSignal
}

export const DEFAULT_PER_SPEC_TIMEOUT_MS = 135_000
