import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ryn = {
  id: "01a0a67c-1dc7-7000-97fd-d50d2527e56b",
  type: "page-type/seat",
  slug: "ryn",
  persona: "persona/ryn",
  assignmentSlug: "access-kind/domain",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
