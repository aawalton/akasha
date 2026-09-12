import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const sophia = {
  id: "01a09560-93e0-7000-9341-f4533ae62949",
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
