import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const athena = {
  id: "01a09c18-3f02-7000-a2a3-7547349566d0",
  type: "seat",
  slug: "athena",
  persona: "athena",
  assignmentSlug: "domain/agent",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
