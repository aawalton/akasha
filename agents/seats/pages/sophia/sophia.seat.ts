import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const sophia = {
  id: "01a09560-20e4-7000-add0-62b4d1bbf94c",
  type: "seat",
  slug: "sophia",
  persona: "sophia",
  assignmentSlug: "domain/persona",
  role: "persona-craft",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
