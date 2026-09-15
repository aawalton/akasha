import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const vera = {
  id: "01a0a57a-558c-7000-be79-dc1f16c5f0db",
  type: "seat",
  slug: "vera",
  persona: "persona/vera",
  assignmentSlug: "domain/graph",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
