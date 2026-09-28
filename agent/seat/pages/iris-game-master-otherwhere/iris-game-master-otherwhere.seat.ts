import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhere = {
  id: "01a0e930-be75-7000-a2a8-f8e687d7e311",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "563a8ae2-a142-4591-a53b-47c35e8ca03b",
} as const satisfies Seat
