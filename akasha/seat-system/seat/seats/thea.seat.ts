import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a058ca-b19b-7000-a487-eb2b44238542",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "domain/checks-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
