import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderTestStoryFlex3 = {
  id: "01a17ef5-427a-7474-8ce2-38153a81a8e4",
  type: "page-type/seat",
  slug: "iris-story-recorder-test-story-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/story-recorder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e43ffc38-0524-4443-a71b-4cadd01dd305",
  createdAt: "2026-10-27T20:02:45.397Z",
  updatedAt: "2026-10-27T20:02:50.428Z",
} as const satisfies Seat
