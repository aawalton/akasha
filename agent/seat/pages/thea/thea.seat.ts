import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thea = {
  id: "01a0d4c9-2c74-7000-af9b-5e38c52ad297",
  type: "page-type/seat",
  slug: "thea",
  persona: "persona/thea",
  assignmentSlug: "initiative/thea-generator-pages",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "b2190abf-a59e-4b03-bc4a-53c46dd5b9f1",
} as const satisfies Seat
