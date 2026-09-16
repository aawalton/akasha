import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thea = {
  id: "01a0956a-e207-7000-abe4-714a414e3030",
  type: "page-type/seat",
  slug: "thea",
  persona: "persona/thea",
  assignmentSlug: "initiative/thea-checks-system",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "7f094c78-7d42-476d-8f22-62f8c42d2cc1",
} as const satisfies Seat
