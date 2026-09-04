import {
  type ResumeSeatInput,
  resumeSeat,
  type SeatHandle,
} from "../resume-seat/resume-seat.module.code.ts"
import {
  decideReviveIoVerify,
  lastAdvancementMs,
  type ReviveIoVerdict,
} from "../seat-revive-io-verify-decide/seat-revive-io-verify-decide.module.code.ts"

export interface ResumeVerifyInput extends ResumeSeatInput {
  readonly graceMs: number
}

export interface ResumeVerifyDeps {
  readonly revive: (input: ResumeSeatInput) => Promise<SeatHandle>
  readonly sampleTranscriptMtimeMs: (agentId: string) => number | null
  readonly sampleOwnedRowUpdatedAtMs: (agentId: string) => number | null
  readonly now: () => number
  readonly sleep: (ms: number) => Promise<void>
}

export interface ReviveVerifyResult {
  readonly handle: SeatHandle
  readonly verdict: ReviveIoVerdict
  readonly reviveAtMs: number
  readonly observedIoMs: number | null
}

export const liveResumeVerifySleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function liveResumeVerifyDeps(
  sampleTranscriptMtimeMs: (agentId: string) => number | null
): ResumeVerifyDeps {
  return {
    revive: (input) => resumeSeat(input),
    sampleTranscriptMtimeMs,
    sampleOwnedRowUpdatedAtMs: () => null,
    now: Date.now,
    sleep: liveResumeVerifySleep,
  }
}

export async function resumeAndVerify(
  input: ResumeVerifyInput,
  deps: ResumeVerifyDeps
): Promise<ReviveVerifyResult> {
  const reviveAtMs = deps.now()
  const handle = await deps.revive({
    agentId: input.agentId,
    prompt: input.prompt,
    bootPrompt: input.bootPrompt,
  })
  await deps.sleep(input.graceMs)
  const transcriptMtimeMs = deps.sampleTranscriptMtimeMs(handle.agentId)
  const ownedRowUpdatedAtMs = deps.sampleOwnedRowUpdatedAtMs(handle.agentId)
  const verdict = decideReviveIoVerify({ transcriptMtimeMs, ownedRowUpdatedAtMs, reviveAtMs })
  return {
    handle,
    verdict,
    reviveAtMs,
    observedIoMs: lastAdvancementMs(transcriptMtimeMs, ownedRowUpdatedAtMs),
  }
}
