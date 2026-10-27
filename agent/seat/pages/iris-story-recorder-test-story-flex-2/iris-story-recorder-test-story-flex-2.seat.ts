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
  claudeCodeSessionUuid: "7ba90355-97d8-4b8a-9f54-0cb06efbe8d8",
  createdAt: "2026-10-27T19:53:22.559Z",
  updatedAt: "2026-10-27T19:53:26.838Z",
} as const satisfies Seat
