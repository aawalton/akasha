import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOverwhereIi = {
  id: "01a0ed10-5ac9-7000-aaa6-1ff80422477e",
  type: "page-type/seat",
  slug: "iris-game-master-overwhere-ii",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-ii",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
