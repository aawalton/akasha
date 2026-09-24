import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const alan = {
  id: "01a0babc-789b-7000-be8a-be01e1d247fd",
  type: "page-type/seat",
  slug: "alan",
  persona: "persona/amy",
  assignmentSlug: "domain/alan",
  role: "role/handler",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "dd0d9c7d-db19-4e8d-8c43-85d4842a96eb",
} as const satisfies Seat
