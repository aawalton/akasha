import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const alan = {
  id: "01a0954d-96fe-7000-93c9-4a5973ef2e30",
  type: "seat",
  slug: "alan",
  persona: "amy",
  assignmentSlug: "domain/alan",
  role: "handler",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
