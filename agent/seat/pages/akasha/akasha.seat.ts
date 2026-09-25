import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const akasha = {
  id: "01a0c43b-c850-7000-bf18-1f9984f6d268",
  type: "page-type/seat",
  slug: "akasha",
  persona: "persona/akasha",
  assignmentSlug: "initiative/akasha-gaps-to-zero",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "c694cb2e-4ab9-4018-90a6-f94c4f144d39",
} as const satisfies Seat
