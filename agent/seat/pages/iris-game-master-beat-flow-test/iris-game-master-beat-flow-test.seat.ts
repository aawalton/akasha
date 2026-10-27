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
  createdAt: "2026-10-27T22:41:43.399Z",
  updatedAt: "2026-10-27T22:41:43.399Z",
} as const satisfies Seat
