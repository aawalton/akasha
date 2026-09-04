import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06a36-ec89-7000-81df-e42e0c4d0031",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
