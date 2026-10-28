import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerProbeTwoFlex2 = {
  id: "01a17fd1-41d2-7368-be48-50c37b93aaa5",
  type: "page-type/seat",
  slug: "iris-reviewer-probe-two-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "bd36f4e3-5563-4bdd-926e-4fe9b51f6d22",
  createdAt: "2026-10-28T00:03:03.093Z",
  updatedAt: "2026-10-28T00:03:08.950Z",
} as const satisfies Seat
