import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhereViii = {
  id: "01a0ea21-44b4-7000-962c-0d272e06344a",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere-viii",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-viii",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
