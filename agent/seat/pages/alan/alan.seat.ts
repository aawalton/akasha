import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const alan = {
  id: "01a0d3f2-4967-7000-827c-676b6015676c",
  type: "page-type/seat",
  slug: "alan",
  persona: "persona/amy",
  assignmentSlug: "domain/alan",
  role: "role/handler",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "6bbb024f-4bc6-4ff2-a178-713ca2ac0ee8",
} as const satisfies Seat
