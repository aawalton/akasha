import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const vera = {
  id: "01a0a20e-e67b-7000-8856-7aec6e0d5ac8",
  type: "seat",
  slug: "vera",
  persona: "persona/vera",
  assignmentSlug: "domain/graph",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
