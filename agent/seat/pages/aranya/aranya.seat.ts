import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aranya = {
  id: "01a0b6d2-3244-7000-b471-d6e769d70318",
  type: "page-type/seat",
  slug: "aranya",
  persona: "persona/aranya",
  assignmentSlug: "domain/infrastructure",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "afc08e1a-071f-4e20-a10a-ebf9808ac37e",
} as const satisfies Seat
