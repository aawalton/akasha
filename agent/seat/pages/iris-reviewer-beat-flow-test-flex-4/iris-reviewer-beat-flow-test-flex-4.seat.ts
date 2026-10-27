import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerBeatFlowTestFlex4 = {
  id: "01a17f92-dbdf-7791-b967-d12b52f028d3",
  type: "page-type/seat",
  slug: "iris-reviewer-beat-flow-test-flex-4",
  persona: "persona/iris",
  assignmentSlug: "story-played/beat-flow-test",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T22:54:53.725Z",
  updatedAt: "2026-10-27T22:54:53.725Z",
} as const satisfies Seat
