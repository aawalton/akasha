import type { Question } from "../question.page-type.ts"

export const doYouWantYourEmailTriageToKeepWakingAmyOrBecomeS = {
  id: "019f9ac1-521c-725c-8d43-a63d8c5d8030",
  pageTypeSlug: "question",
  slug: "do-you-want-your-email-triage-to-keep-waking-amy-or-become-s",
  ask: "Do you want your email triage to keep waking amy, or become something you pull?",
  askedBy: "athena",
  askedIn: "019f9a36-4de1-75d5-a150-1f9269c2e85a",
  status: "answered",
  offered: [
    "Keep the wake — fix the lossiness, leave triage push-driven",
    "Make it pull — amy reads mail state when she is already awake",
    "Keep the wake but route it to me, not amy",
  ],
  answer: "Keep the wake — fix the lossiness, leave triage push-driven",
  closedAt: "2026-07-25T19:30:17.049Z",
  context: "txt",
} as const satisfies Question
