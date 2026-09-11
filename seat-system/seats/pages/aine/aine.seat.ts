import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const aine = {
  id: "01a09100-496d-7000-8d24-fb60428e7ba4",
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
