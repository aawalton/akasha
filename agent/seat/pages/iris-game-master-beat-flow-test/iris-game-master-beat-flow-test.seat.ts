import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterBeatFlowTest = {
  id: "01a17f86-cb65-70e6-819f-769d21c87a6f",
  type: "page-type/seat",
  slug: "iris-game-master-beat-flow-test",
  persona: "persona/iris",
  assignmentSlug: "story-played/beat-flow-test",
  role: "role/game-master",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "eb8ed8fb-bfeb-4f60-bbf1-6f2e83b20870",
  createdAt: "2026-10-27T22:41:43.399Z",
  updatedAt: "2026-10-27T22:41:46.469Z",
} as const satisfies Seat
