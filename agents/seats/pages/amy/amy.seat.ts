import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const amy = {
  id: "01a09581-cb35-7000-b00f-7156d6b3ce13",
  type: "seat",
  slug: "amy",
  persona: "amy",
  assignmentSlug: "domain/alan-harness",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
