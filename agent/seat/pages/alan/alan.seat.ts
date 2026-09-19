import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const alan = {
  id: "01a0ba46-efb0-7000-ad7a-18dc65b2b8a9",
  type: "page-type/seat",
  slug: "alan",
  persona: "persona/amy",
  assignmentSlug: "domain/alan",
  role: "role/handler",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
