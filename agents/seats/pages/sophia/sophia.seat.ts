import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const sophia = {
  id: "01a09ff3-911c-7000-b771-d1de18a4843f",
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
