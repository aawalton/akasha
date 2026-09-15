import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const alan = {
  id: "01a0a2b0-ff9c-7000-a5c5-f6da5998144f",
  type: "seat",
  slug: "alan",
  persona: "persona/amy",
  assignmentSlug: "domain/alan",
  role: "role/handler",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "d5cd93e0-37e7-4429-bf74-8f129dac1727",
} as const satisfies Seat
