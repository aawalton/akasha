import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const alan = {
  id: "01a0a2af-9d29-7000-a589-ef9d7f166cd9",
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
