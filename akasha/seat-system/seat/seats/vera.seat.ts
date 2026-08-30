import type { Seat } from "../seat.page-type.ts"

export const vera = {
  id: "01a04f59-ac77-7000-9940-ad92331cd259",
  pageTypeSlug: "seat",
  slug: "vera",
  personaSlug: "vera",
  assignmentSlug: "domain/graph-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
