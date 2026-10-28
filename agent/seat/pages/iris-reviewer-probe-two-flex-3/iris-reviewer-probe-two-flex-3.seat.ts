import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerProbeTwoFlex3 = {
  id: "01a17fd1-64f3-75e5-b5e5-7e01950eab28",
  type: "page-type/seat",
  slug: "iris-reviewer-probe-two-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-28T00:03:12.036Z",
  updatedAt: "2026-10-28T00:03:12.036Z",
} as const satisfies Seat
