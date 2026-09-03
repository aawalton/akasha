import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06963-274e-7000-9fe9-a044a3be3560",
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
