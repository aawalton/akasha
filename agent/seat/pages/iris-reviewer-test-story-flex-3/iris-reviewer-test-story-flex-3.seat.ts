import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerTestStoryFlex3 = {
  id: "01a17ef8-6b7f-731b-900b-10c99936edb9",
  type: "page-type/seat",
  slug: "iris-reviewer-test-story-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e5623ff2-aa5d-4ab0-898f-649b9df35144",
  createdAt: "2026-10-27T20:06:12.490Z",
  updatedAt: "2026-10-27T20:06:17.821Z",
} as const satisfies Seat
