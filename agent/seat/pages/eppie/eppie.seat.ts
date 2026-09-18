import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const eppie = {
  id: "01a0b6bd-0e2c-7000-b486-6c41bb2d6b8c",
  type: "page-type/seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "domain/music",
  role: "role/companion",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
