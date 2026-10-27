import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerTestStoryFlex4 = {
  id: "01a17ef8-90ed-744b-8ec3-e59f79a0d0e2",
  type: "page-type/seat",
  slug: "iris-reviewer-test-story-flex-4",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "91681042-e541-49a2-bbaf-20a0ade914af",
  createdAt: "2026-10-27T20:06:22.043Z",
  updatedAt: "2026-10-27T20:06:26.937Z",
} as const satisfies Seat
