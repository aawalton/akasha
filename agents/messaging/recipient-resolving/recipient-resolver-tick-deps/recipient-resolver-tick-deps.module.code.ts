import type {
  CommsInput,
  OnDemandAgentSpec,
} from "akasha/agents/messaging/recipient-resolving/seat-wake-rules/seat-wake-rules.module.code.ts"
import type { ReviveVerifySignal } from "akasha/agents/seats/modules/revive-verify-signal/seat-revive-verify-signal.module.code.ts"

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
