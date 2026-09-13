import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const olwen = {
  id: "01a09c5a-5d65-7000-a802-ca13fcc51fb2",
  type: "seat",
  slug: "olwen",
  persona: "olwen",
  assignmentSlug: "domain/design-interfaces-system",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
