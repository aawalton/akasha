import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a0c4bf-3759-7000-a725-3aa0fd7b2e15",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
