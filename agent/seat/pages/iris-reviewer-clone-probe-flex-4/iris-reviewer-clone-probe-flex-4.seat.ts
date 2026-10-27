import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerCloneProbeFlex4 = {
  id: "01a17f67-a6b5-71be-adb7-8294674a7f1e",
  type: "page-type/seat",
  slug: "iris-reviewer-clone-probe-flex-4",
  persona: "persona/iris",
  assignmentSlug: "story-played/clone-probe",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0c1cf561-38bb-46b5-83d8-757247cfc8df",
  createdAt: "2026-10-27T22:07:42.147Z",
  updatedAt: "2026-10-27T22:07:52.364Z",
} as const satisfies Seat
