import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereX = {
  id: "01a0ea61-dd72-7000-a2a9-e3f45f15e971",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-x",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
