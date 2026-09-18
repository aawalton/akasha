import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aelwyn = {
  id: "01a0b6b3-3bdf-7000-b856-762fe285d6e6",
  type: "page-type/seat",
  slug: "aelwyn",
  persona: "persona/aelwyn",
  assignmentSlug: "domain/fitness",
  role: "role/coach",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
