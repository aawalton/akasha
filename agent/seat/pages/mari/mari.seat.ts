import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mari = {
  id: "01a0e916-ccb7-7000-a93a-e8216f968e2a",
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
