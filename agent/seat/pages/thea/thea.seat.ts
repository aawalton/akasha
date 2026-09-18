import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thea = {
  id: "01a0b6b3-752a-7000-9f3d-e5e3401c91df",
  type: "page-type/seat",
  slug: "thea",
  persona: "persona/thea",
  assignmentSlug: "domain/check",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
