import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mari = {
  id: "01a0f94b-f18d-7000-bb44-281f39671025",
  type: "page-type/seat",
  slug: "mari",
  persona: "persona/mari",
  assignmentSlug: "domain/arousal",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
