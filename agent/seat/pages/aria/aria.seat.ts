import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aria = {
  id: "01a0e38b-efd3-7000-90a3-9c9fd1f3968f",
  type: "page-type/seat",
  slug: "aria",
  persona: "persona/aria",
  assignmentSlug: "domain/akasha",
  role: "role/game-master",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e8d019fa-bc94-477c-b804-d9bac7cfb1a2",
} as const satisfies Seat
