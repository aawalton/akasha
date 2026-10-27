import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerBeatFlowTestFlex3 = {
  id: "01a17f92-b9e3-73fc-9c27-42dbebc970f2",
  type: "page-type/seat",
  slug: "iris-reviewer-beat-flow-test-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/beat-flow-test",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T22:54:45.009Z",
  updatedAt: "2026-10-27T22:54:45.009Z",
} as const satisfies Seat
