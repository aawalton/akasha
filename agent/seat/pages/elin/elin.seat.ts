import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a0a64b-8846-7000-a996-67b7560c31ad",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "6f6782e5-434f-4ccc-b85f-8b50686e1708",
} as const satisfies Seat
