import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06549-e02e-7000-a03d-0bc33bec769b",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
