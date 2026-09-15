import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nimue = {
  id: "01a0a5d4-147f-7000-a937-2def6efea373",
  type: "page-type/seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "initiative/nimue-misc",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "77234925-ea52-4b4c-b5a7-53753ff0dd33",
} as const satisfies Seat
