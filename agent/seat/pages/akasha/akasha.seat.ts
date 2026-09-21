import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const akasha = {
  id: "01a0c43b-c850-7000-bf18-1f9984f6d268",
  type: "page-type/seat",
  slug: "akasha",
  persona: "persona/akasha",
  assignmentSlug: "domain/akasha",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
