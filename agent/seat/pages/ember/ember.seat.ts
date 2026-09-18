import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a0b6c6-4b65-7000-a6ef-01448bb6d7d8",
  type: "page-type/seat",
  slug: "ember",
  persona: "persona/ember",
  assignmentSlug: "domain/temper",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
