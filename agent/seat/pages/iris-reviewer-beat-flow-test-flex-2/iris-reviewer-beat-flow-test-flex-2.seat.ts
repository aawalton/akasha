import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerBeatFlowTestFlex2 = {
  id: "01a17f92-97db-73d2-bd2f-9707fa751e18",
  type: "page-type/seat",
  slug: "iris-reviewer-beat-flow-test-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/beat-flow-test",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "4d51c089-2ad2-41ef-be1a-fdda2e1b9074",
  createdAt: "2026-10-27T22:54:36.296Z",
  updatedAt: "2026-10-27T22:54:39.577Z",
} as const satisfies Seat
