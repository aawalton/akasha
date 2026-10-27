import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderTestStoryFlex2 = {
  id: "01a17eec-abf6-7006-953e-c86e0b31d813",
  type: "page-type/seat",
  slug: "iris-story-recorder-test-story-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/story-recorder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T19:53:22.559Z",
  updatedAt: "2026-10-27T19:53:22.559Z",
} as const satisfies Seat
