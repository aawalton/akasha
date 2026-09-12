import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const thea = {
  id: "01a0956a-e207-7000-abe4-714a414e3030",
  type: "seat",
  slug: "thea",
  persona: "thea",
  assignmentSlug: "domain/check",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "7f094c78-7d42-476d-8f22-62f8c42d2cc1",
} as const satisfies Seat
