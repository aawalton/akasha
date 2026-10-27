import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderTestStoryFlex5 = {
  id: "01a17eec-dedd-73aa-a1d3-e70a54cd4868",
  type: "page-type/seat",
  slug: "iris-story-recorder-test-story-flex-5",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/story-recorder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T19:53:35.529Z",
  updatedAt: "2026-10-27T19:53:35.529Z",
} as const satisfies Seat
