import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOverwhereI = {
  id: "01a0ed0e-7180-7000-9d8d-57fecbf0704a",
  type: "page-type/seat",
  slug: "iris-game-master-overwhere-i",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-i",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
