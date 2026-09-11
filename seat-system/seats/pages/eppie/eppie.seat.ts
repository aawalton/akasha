import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const eppie = {
  id: "01a090f1-3fec-7000-b1ed-04747a27266e",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "eppie",
  persona: "eppie",
  assignmentSlug: "domain/music",
  role: "companion",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
