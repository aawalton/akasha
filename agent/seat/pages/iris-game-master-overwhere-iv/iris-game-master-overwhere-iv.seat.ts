import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOverwhereIv = {
  id: "01a0ed13-f2d8-7000-b3dd-b45b12d83068",
  type: "page-type/seat",
  slug: "iris-game-master-overwhere-iv",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-iv",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
