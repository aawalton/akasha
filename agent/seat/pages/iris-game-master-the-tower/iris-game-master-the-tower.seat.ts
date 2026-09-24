import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterTheTower = {
  id: "01a0d4a9-a8a3-7000-8fa2-8fbb29c1b7ee",
  type: "page-type/seat",
  slug: "iris-game-master-the-tower",
  persona: "persona/iris",
  assignmentSlug: "game/the-tower",
  role: "role/game-master",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
