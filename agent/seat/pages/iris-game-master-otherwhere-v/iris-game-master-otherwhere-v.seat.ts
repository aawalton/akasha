import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereV = {
  id: "01a0e9e5-3a9c-7000-97c0-47a07405b6ce",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-v",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-v",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
