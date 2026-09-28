import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereVii = {
  id: "01a0ea20-aebf-7000-98fb-cb8b5ac8d26b",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-vii",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-vii",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
