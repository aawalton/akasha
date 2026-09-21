import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ryn = {
  id: "01a0c52c-858d-7000-b106-658812535089",
  type: "page-type/seat",
  slug: "ryn",
  persona: "persona/ryn",
  assignmentSlug: "access-kind/domain",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
