import type { Question } from "../question.page-type.ts"

export const shouldOrphanProjectIntakeBecomeMyJobAgainOrStayYou = {
  id: "019f94f7-78c5-741b-aa9f-86728960c3cc",
  pageTypeSlug: "question",
  slug: "should-orphan-project-intake-become-my-job-again-or-stay-you",
  ask: "Should orphan-project intake become my job again, or stay yours? I'm currently clarity-only by design.",
  askedBy: "aine",
  askedIn: "019f93a6-67c0-7174-a75d-40ae007e92e4",
  status: "answered",
  offered: [
    "Give intake back to me (real role change)",
    "Keep me clarity-only; triage stays yours",
  ],
  answer: "Move to Dalla",
  closedAt: "2026-07-24T16:31:54.325Z",
  context: "txt",
} as const satisfies Question
