import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a0e882-accb-7000-a6dc-cdb03fdb06e9",
  type: "page-type/seat",
  slug: "ember",
  persona: "persona/ember",
  assignmentSlug: "domain/temper",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "f1ef08ac-064e-4821-a555-79abcecf524d",
} as const satisfies Seat
