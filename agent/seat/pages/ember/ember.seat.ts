import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a0de4b-173e-7000-a50d-be94687adf49",
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
