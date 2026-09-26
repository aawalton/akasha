import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a0de3f-3f82-7000-b282-4255f290a97e",
  type: "page-type/seat",
  slug: "ember",
  persona: "persona/ember",
  assignmentSlug: "domain/temper",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
