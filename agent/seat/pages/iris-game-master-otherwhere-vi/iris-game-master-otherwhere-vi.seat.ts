import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereVi = {
  id: "01a0ea20-26a4-7000-a99e-04b3a38649d4",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-vi",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-vi",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
