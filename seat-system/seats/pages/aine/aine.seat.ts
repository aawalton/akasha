import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const aine = {
  id: "01a09102-97a5-7000-bdb9-f3ad7e8498f4",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "aine",
  persona: "aine",
  assignmentSlug: "page-type/finding",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
