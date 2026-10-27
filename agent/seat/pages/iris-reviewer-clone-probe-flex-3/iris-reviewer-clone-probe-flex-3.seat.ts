import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerCloneProbeFlex3 = {
  id: "01a17f67-80b5-7506-b009-ebc40f69f321",
  type: "page-type/seat",
  slug: "iris-reviewer-clone-probe-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/clone-probe",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "1ddb92f9-1b31-49d3-b87d-63b9760d4e63",
  createdAt: "2026-10-27T22:07:32.409Z",
  updatedAt: "2026-10-27T22:07:36.500Z",
} as const satisfies Seat
