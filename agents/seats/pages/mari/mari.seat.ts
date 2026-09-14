import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const mari = {
  id: "01a0a034-4b48-7000-bee0-7b685b194aa2",
  type: "seat",
  slug: "mari",
  persona: "mari",
  assignmentSlug: "domain/arousal",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
