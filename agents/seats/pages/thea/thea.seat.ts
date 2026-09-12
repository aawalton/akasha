import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const thea = {
  id: "01a0956a-e207-7000-abe4-714a414e3030",
  type: "seat",
  slug: "thea",
  persona: "thea",
  assignmentSlug: "domain/check",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
