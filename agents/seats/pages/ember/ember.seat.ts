import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const ember = {
  id: "01a09573-2604-7000-98dd-c04bec8e0696",
  type: "seat",
  slug: "ember",
  persona: "ember",
  assignmentSlug: "domain/temper",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
