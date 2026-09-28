import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereIx = {
  id: "01a0ea22-0b08-7000-b35b-c0ce6eb600b2",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-ix",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-ix",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
