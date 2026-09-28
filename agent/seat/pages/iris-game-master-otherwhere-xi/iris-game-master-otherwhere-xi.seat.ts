import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereXi = {
  id: "01a0ea64-980d-7000-95dd-fac9c7b1e276",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-xi",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-xi",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
