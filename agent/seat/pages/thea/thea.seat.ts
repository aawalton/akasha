import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thea = {
  id: "01a0d4c9-2c74-7000-af9b-5e38c52ad297",
  type: "page-type/seat",
  slug: "thea",
  persona: "persona/thea",
  assignmentSlug: "domain/check",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
