import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterTheTower = {
  id: "01a0d4a9-a8a3-7000-8fa2-8fbb29c1b7ee",
  type: "page-type/seat",
  slug: "iris-game-master-the-tower",
  persona: "persona/iris",
  assignmentSlug: "game/the-tower",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "27c433bc-d900-4029-9b5e-e0b94c46c00f",
} as const satisfies Seat
