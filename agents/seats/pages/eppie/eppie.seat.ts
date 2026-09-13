import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const eppie = {
  id: "01a09b60-8172-7000-b9b7-86a3019abbf7",
  type: "seat",
  slug: "eppie",
  persona: "eppie",
  assignmentSlug: "domain/music",
  role: "companion",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
