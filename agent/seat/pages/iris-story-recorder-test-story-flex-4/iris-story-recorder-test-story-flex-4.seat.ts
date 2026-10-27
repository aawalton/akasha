import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderTestStoryFlex4 = {
  id: "01a17ef5-684f-77bd-ad6b-9b6af352940b",
  type: "page-type/seat",
  slug: "iris-story-recorder-test-story-flex-4",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/story-recorder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T20:02:55.099Z",
  updatedAt: "2026-10-27T20:02:55.099Z",
} as const satisfies Seat
