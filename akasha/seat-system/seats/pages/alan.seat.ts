import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06740-8af9-7000-af45-773ec40943d0",
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
