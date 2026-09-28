import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisGameMasterOtherwhere = {
  id: "01a0e985-de19-7000-a721-2021ebefdff0",
  type: "page-type/seat",
  slug: "iris-game-master-otherwhere",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "26545959-2f4a-4e99-adbb-1b98c66ed109",
} as const satisfies Seat
