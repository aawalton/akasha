import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderTestStory = {
  id: "01a17ee8-0531-7668-ba5e-69fe7f1bfb90",
  type: "page-type/seat",
  slug: "iris-world-builder-test-story",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T19:48:17.734Z",
  updatedAt: "2026-10-27T19:48:17.734Z",
} as const satisfies Seat
