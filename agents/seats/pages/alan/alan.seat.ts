import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const alan = {
  id: "01a0960c-bed2-7000-bf3e-1930976ad678",
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
