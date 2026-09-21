import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const eppie = {
  id: "01a0c42d-b1bf-7000-a0b7-17b1cbab46db",
  type: "page-type/seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "domain/music",
  role: "role/companion",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
