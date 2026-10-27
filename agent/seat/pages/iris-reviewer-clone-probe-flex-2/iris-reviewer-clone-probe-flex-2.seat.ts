import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerCloneProbeFlex2 = {
  id: "01a17f67-5ef6-7571-b152-dc68be2fd043",
  type: "page-type/seat",
  slug: "iris-reviewer-clone-probe-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/clone-probe",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "7e337145-6520-493e-a23b-e618fdfcdf56",
  createdAt: "2026-10-27T22:07:23.687Z",
  updatedAt: "2026-10-27T22:07:27.155Z",
} as const satisfies Seat
