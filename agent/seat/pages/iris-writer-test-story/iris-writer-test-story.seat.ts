import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterTestStory = {
  id: "01a17ee8-3e51-7677-a0fe-cc0006b688fa",
  type: "page-type/seat",
  slug: "iris-writer-test-story",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T19:48:32.396Z",
  updatedAt: "2026-10-27T19:48:32.396Z",
} as const satisfies Seat
