import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereIv = {
  id: "01a0e9e2-7c23-7000-accc-0c22c619bb97",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-iv",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-iv",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
