import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ryn = {
  id: "01a0a24e-966b-7000-92e6-12c246d25eff",
  type: "seat",
  slug: "ryn",
  persona: "persona/ryn",
  assignmentSlug: "access-kind/domain",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
