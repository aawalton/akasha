import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const aine = {
  id: "01a0956a-98ce-7000-ad7c-7bd84a84928a",
  type: "seat",
  slug: "aine",
  persona: "aine",
  assignmentSlug: "page-type/finding",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
