import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterTestStory = {
  id: "01a17ee7-cad7-7753-aa77-d5728078c35d",
  type: "page-type/seat",
  slug: "iris-game-master-test-story",
  persona: "persona/iris",
  assignmentSlug: "story-played/test-story",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "33d9c163-8c8f-430b-a500-02e5e102e039",
  createdAt: "2026-10-27T19:48:03.206Z",
  updatedAt: "2026-10-27T19:48:07.356Z",
} as const satisfies Seat
