import {
  classifyTranscriptDelivery,
  type TranscriptOutcome,
} from "akasha/agent/message/modules/channel-delivery/agent-message-channel-delivery.module.code.ts"
import {
  type ClaimedRedeliveryDecision,
  decideClaimedRedelivery,
  type ClaimedCandidate as RuleCandidate,
} from "akasha/agent/message/modules/supervisor-claimed-redelivery-decide/agent-message-supervisor-claimed-redelivery-decide.module.code.ts"
import { redeliveryHoldoff } from "akasha/agent/message/modules/supervisor-redelivery-holdoff/agent-message-supervisor-redelivery-holdoff.module.code.ts"

const LOG = "[supervisor:claimed-redelivery]"

const NEVER: Promise<never> = new Promise(() => {})

export interface ClaimedCandidate {
  readonly id: string
  readonly claimedAtMs: number
  readonly injectedAtMs: number | null
}

interface ClaimedRedeliveryQuestion {
  readonly candidates: readonly RuleCandidate[]
  readonly processStartedAtMs: number
}

function transcriptFinding(
  transcript: string,
  messageId: string
): { readonly outcome: TranscriptOutcome; readonly selfRead: boolean } {
  const finding = classifyTranscriptDelivery({ text: transcript, messageId, sessionEnded: true })
  return { outcome: finding.outcome, selfRead: finding.selfRead }
}

export interface ClaimedReconcileDeps {
  readonly readClaimed: (agentId: string, beforeMs: number) => Promise<readonly ClaimedCandidate[]>
  readonly readTail?: (agentId: string) => string | null
  readonly release?: (id: string) => Promise<void>
  readonly take?: (id: string) => Promise<string | null>
  readonly waitForRedeliveryWindow?: () => Promise<boolean>
  readonly decide?: (question: ClaimedRedeliveryQuestion) => Promise<ClaimedRedeliveryDecision>
  readonly log?: (message: string) => void
  readonly logError?: (message: string, err: unknown) => void
}

export async function reconcileClaimedRedelivery(
  seat: { readonly agentId: string; readonly processStartedAtMs: number },
  deps: ClaimedReconcileDeps
): Promise<void> {
  const { agentId, processStartedAtMs } = seat
  const waitForRedeliveryWindow = deps.waitForRedeliveryWindow ?? (() => redeliveryHoldoff(NEVER))
  const decide = deps.decide ?? (async (question) => decideClaimedRedelivery(question))
  const log = deps.log ?? ((message) => console.log(message))
  const logError = deps.logError ?? ((message, err) => console.error(message, err))

  try {
    const transcript = deps.readTail?.(agentId) ?? null

    if (!(await waitForRedeliveryWindow())) return

    const candidates = await deps.readClaimed(agentId, processStartedAtMs)
    if (candidates.length === 0) return

    const decision = await decide({
      processStartedAtMs,
      candidates: candidates.map((candidate) => ({
        id: candidate.id,
        claimedAtMs: candidate.claimedAtMs,
        injectedAtMs: candidate.injectedAtMs,
        finding: transcript === null ? null : transcriptFinding(transcript, candidate.id),
      })),
    })
    for (const skip of decision.skipped) {
      log(`${LOG} agent ${agentId}: holding ${skip.id} — ${skip.reason}`)
    }
    for (const skip of decision.skipped) {
      if (skip.reason !== "injected" || deps.take === undefined) continue
      try {
        const refused = await deps.take(skip.id)
        if (refused === null) log(`${LOG} took ${skip.id}, which reached the seat already`)
        else log(`${LOG} could not take ${skip.id} (${refused}); it stays claimed`)
      } catch (err) {
        logError(`${LOG} failed to take ${skip.id}:`, err)
      }
    }
    if (decision.release.length === 0) return

    log(
      `${LOG} agent ${agentId}: ${decision.release.length} claimed-but-unconsumed message(s) — releasing for redelivery: ${decision.release.join(", ")}`
    )
    for (const id of decision.release) {
      try {
        await deps.release?.(id)
        log(`${LOG} released ${id} (claimed → pending)`)
      } catch (err) {
        logError(`${LOG} failed to release ${id}:`, err)
      }
    }
  } catch (err) {
    logError(`${LOG} reconcile failed for agent ${agentId} (best-effort; resume continues):`, err)
  }
}
