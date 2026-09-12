import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const aranya = {
  id: "01a09567-c288-7000-a3f9-23c89b2064b4",
  type: "seat",
  slug: "aranya",
  persona: "aranya",
  assignmentSlug: "domain/infrastructure",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
