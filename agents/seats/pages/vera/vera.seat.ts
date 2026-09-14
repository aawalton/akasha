import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const vera = {
  id: "01a09ff7-60d4-7000-83d2-20cde8033039",
  type: "seat",
  slug: "vera",
  persona: "vera",
  assignmentSlug: "domain/graph",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
