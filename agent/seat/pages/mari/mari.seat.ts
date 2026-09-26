import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mari = {
  id: "01a0de36-465a-7000-83fc-7f82e8b20398",
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
