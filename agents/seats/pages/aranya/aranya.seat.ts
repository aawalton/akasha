import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const aranya = {
  id: "01a0a003-e762-7000-80a7-1fdc774181ba",
  type: "seat",
  slug: "aranya",
  persona: "aranya",
  assignmentSlug: "domain/infrastructure",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
