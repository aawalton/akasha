import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerProbeTwoFlex1 = {
  id: "01a17fd1-1f80-74ed-9790-c06a71933d10",
  type: "page-type/seat",
  slug: "iris-reviewer-probe-two-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "7596d51f-8c42-4d43-94a5-2cfc2489c66d",
  createdAt: "2026-10-28T00:02:54.276Z",
  updatedAt: "2026-10-28T00:02:57.489Z",
} as const satisfies Seat
