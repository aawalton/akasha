import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const alan = {
  id: "01a0953d-4d70-7000-89b1-65ecd62cb98e",
  type: "seat",
  slug: "alan",
  persona: "amy",
  assignmentSlug: "domain/alan",
  role: "handler",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
