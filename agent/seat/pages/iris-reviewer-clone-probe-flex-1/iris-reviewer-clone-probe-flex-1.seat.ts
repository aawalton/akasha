import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerCloneProbeFlex1 = {
  id: "01a17f67-3d12-7458-b962-31d54bdd8505",
  type: "page-type/seat",
  slug: "iris-reviewer-clone-probe-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/clone-probe",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T22:07:15.072Z",
  updatedAt: "2026-10-27T22:07:15.072Z",
} as const satisfies Seat
