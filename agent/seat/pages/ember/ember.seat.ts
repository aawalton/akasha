import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a0c42d-d654-7000-af46-de603df30cc1",
  type: "page-type/seat",
  slug: "ember",
  persona: "persona/ember",
  assignmentSlug: "domain/temper",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
