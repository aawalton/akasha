import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const vera = {
  id: "01a09ff7-60d4-7000-83d2-20cde8033039",
  type: "seat",
  slug: "vera",
  persona: "persona/vera",
  assignmentSlug: "domain/graph",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "e9dfba11-06ca-48e2-a963-a7a8482a97ce",
} as const satisfies Seat
