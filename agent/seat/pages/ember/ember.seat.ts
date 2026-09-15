import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a0a533-f22b-7000-bf0d-dbed0323e9b0",
  type: "seat",
  slug: "ember",
  persona: "persona/ember",
  assignmentSlug: "domain/temper",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
