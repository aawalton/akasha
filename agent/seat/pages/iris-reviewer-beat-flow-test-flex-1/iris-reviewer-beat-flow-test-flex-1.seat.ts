import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerBeatFlowTestFlex1 = {
  id: "01a17f92-785f-7136-b539-a1387195b883",
  type: "page-type/seat",
  slug: "iris-reviewer-beat-flow-test-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/beat-flow-test",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T22:54:28.225Z",
  updatedAt: "2026-10-27T22:54:28.225Z",
} as const satisfies Seat
