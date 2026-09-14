import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const nimue = {
  id: "01a0a0ac-e99d-7000-9a90-e2454174c879",
  type: "seat",
  slug: "nimue",
  persona: "nimue",
  assignmentSlug: "domain/technology",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
