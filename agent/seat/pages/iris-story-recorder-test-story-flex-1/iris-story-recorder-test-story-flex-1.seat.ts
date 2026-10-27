import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderTestStoryFlex1 = {
  id: "01a17eec-89fc-72be-b32a-c1a8fd2ede1f",
  type: "page-type/seat",
  slug: "iris-story-recorder-test-story-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/story-recorder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e6dae2a3-055e-41e9-a80c-38e87426820b",
  createdAt: "2026-10-27T19:53:13.859Z",
  updatedAt: "2026-10-27T19:53:18.001Z",
} as const satisfies Seat
