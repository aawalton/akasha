import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerTestStoryFlex2 = {
  id: "01a17ef8-43e7-71a7-8bf3-ba350536db26",
  type: "page-type/seat",
  slug: "iris-reviewer-test-story-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T20:06:02.363Z",
  updatedAt: "2026-10-27T20:06:02.363Z",
} as const satisfies Seat
