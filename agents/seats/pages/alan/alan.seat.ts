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
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "06b5245f-b1cc-4ad4-87eb-e2a138bfcad2",
} as const satisfies Seat
