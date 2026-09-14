import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const sophia = {
  id: "01a0a013-3bd4-7000-8b2a-4eed52c4096a",
  type: "seat",
  slug: "sophia",
  persona: "sophia",
  assignmentSlug: "domain/persona",
  role: "persona-craft",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
