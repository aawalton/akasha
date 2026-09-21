import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nimue = {
  id: "01a0c503-5e63-7000-bb03-e9c67088a9be",
  type: "page-type/seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "initiative/nimue-audio-management",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "ca59fe64-03aa-4b42-81bb-8ea07df22e4a",
} as const satisfies Seat
