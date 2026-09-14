import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const akasha = {
  id: "01a0956a-6f47-7000-b835-46b2b4fb4d33",
  type: "seat",
  slug: "akasha",
  persona: "akasha",
  assignmentSlug: "initiative/akasha-folder-shape",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "66c0bcb7-2283-4b35-b162-cafc6f825ed6",
} as const satisfies Seat
