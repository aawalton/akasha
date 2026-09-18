import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a0b6d5-b280-7000-8585-60e5052cb5a3",
  type: "page-type/seat",
  slug: "amy",
  persona: "persona/amy",
  assignmentSlug: "domain/alan-harness",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
