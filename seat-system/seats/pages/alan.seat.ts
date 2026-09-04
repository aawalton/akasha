import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06c2f-aaa0-7000-bb52-d4a88ab44069",
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
