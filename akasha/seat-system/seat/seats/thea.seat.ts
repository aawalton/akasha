import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a04e50-a98d-7000-9182-d3565f0eee22",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "domain/checks-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
