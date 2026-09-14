import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const ryn = {
  id: "01a09fed-a7f0-7000-bc1f-d21a745745f5",
  type: "seat",
  slug: "ryn",
  persona: "ryn",
  assignmentSlug: "domain/domain",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "179dad85-5db3-45b3-a226-2ff095aa6822",
} as const satisfies Seat
