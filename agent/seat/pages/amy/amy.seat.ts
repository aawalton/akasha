import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a0d377-c89a-7000-bc96-2aea29720a6f",
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
