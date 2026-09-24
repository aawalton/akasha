import { noticeNamed } from "akasha/agent/message/notice/modules/compose-notices/compose-notices.module.code.ts"
import { waitResumeNudge } from "akasha/agent/message/notice/pages/wait-resume-nudge/wait-resume-nudge.agent-message-notice.ts"
import {
  decideWaitResume,
  type WaitResumeInput,
} from "akasha/agent/seat/supervisor/seat-work-restart/modules/supervisor-wait-resume-decide/supervisor-wait-resume-decide.module.code.ts"

export type WaitResumeVerdict =
  | {
      readonly kind: "nudge"
      readonly reason: string
      readonly attempt: number
      readonly nudge: string
    }
  | { readonly kind: "wait"; readonly reason: string; readonly readyAtMs: number }
  | { readonly kind: "hold"; readonly reason: string }

export function waitResumeVerdict(input: WaitResumeInput): WaitResumeVerdict {
  const decision = decideWaitResume(input)
  if (decision.kind !== "nudge") return decision
  const nudge = noticeNamed(waitResumeNudge.slug)
  if (nudge.trim() === "") {
    throw new Error("the wait-resume nudge is blank, which would reach the seat as an empty turn")
  }
  return { kind: "nudge", reason: decision.reason, attempt: decision.attempt, nudge }
}
