import { noticeNamed } from "akasha/agent/message/notice/modules/compose-notices/compose-notices.module.code.ts"
import { limitResumeNudge } from "akasha/agent/message/notice/pages/limit-resume-nudge/limit-resume-nudge.agent-message-notice.ts"
import {
  decideLimitResume,
  LIMIT_RESUME_FLOOR_MS,
  type LimitResumeInput,
} from "akasha/agent/seat/supervisor/supervisor-resuming/modules/supervisor-limit-resume-decide/supervisor-limit-resume-decide.module.code.ts"

export type LimitResumeVerdict =
  | {
      readonly kind: "nudge"
      readonly reason: string
      readonly nudge: string
      readonly floorMs: number
    }
  | { readonly kind: "wait"; readonly reason: string }
  | { readonly kind: "hold"; readonly reason: string }

export function limitResumeVerdict(input: LimitResumeInput): LimitResumeVerdict {
  const decision = decideLimitResume(input)
  if (decision.kind !== "nudge") return decision
  const nudge = noticeNamed(limitResumeNudge.slug)
  if (nudge.trim() === "") {
    throw new Error("the limit-resume nudge is blank, which would reach the seat as an empty turn")
  }
  return { kind: "nudge", reason: decision.reason, nudge, floorMs: LIMIT_RESUME_FLOOR_MS }
}
