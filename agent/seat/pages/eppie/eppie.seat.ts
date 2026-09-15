import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const eppie = {
  id: "01a0a53a-5c89-7000-b144-3df1c7e52a08",
  type: "seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "domain/music",
  role: "role/companion",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
