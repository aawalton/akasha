import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const alan = {
  id: "01a0a2b0-1efa-7000-8b56-59a6fcc2b115",
  type: "seat",
  slug: "alan",
  persona: "persona/amy",
  assignmentSlug: "domain/alan",
  role: "role/handler",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
