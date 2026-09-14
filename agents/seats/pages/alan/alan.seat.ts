import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const alan = {
  id: "01a0a1ec-0c66-7000-b1e5-9f1d9d04e0dd",
  type: "seat",
  slug: "alan",
  persona: "persona/amy",
  assignmentSlug: "domain/alan",
  role: "role/handler",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "c6f79529-b54d-43c9-ae89-7f174cd4ec6d",
} as const satisfies Seat
