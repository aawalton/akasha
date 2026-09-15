import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ryn = {
  id: "01a0a299-78d7-7000-9bc1-56ecb8bbc6e1",
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
