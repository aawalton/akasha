import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const nimue = {
  id: "01a0a1e6-72ca-7000-a55a-0ebbe84c0ca4",
  type: "seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "domain/technology",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
