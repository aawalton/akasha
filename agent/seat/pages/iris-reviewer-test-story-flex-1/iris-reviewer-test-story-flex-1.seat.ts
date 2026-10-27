import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerTestStoryFlex1 = {
  id: "01a17ef8-1325-767d-87f0-2ae29da0465b",
  type: "page-type/seat",
  slug: "iris-reviewer-test-story-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T20:05:50.108Z",
  updatedAt: "2026-10-27T20:05:50.108Z",
} as const satisfies Seat
