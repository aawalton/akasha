import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOverwhereI = {
  id: "01a103cb-f561-7000-9c98-2fcef914fe38",
  type: "page-type/seat",
  slug: "iris-game-master-overwhere-i",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-i",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "187e2f55-22b1-4f86-847f-3634d8133e6e",
} as const satisfies Seat
