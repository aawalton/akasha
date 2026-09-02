import type { Seat } from "../seat.page-type.ts"

export const eppie = {
  id: "01a06219-9bdf-7000-a00a-7d8e51d8d5a7",
  pageTypeSlug: "seat",
  slug: "eppie",
  personaSlug: "eppie",
  assignmentSlug: "domain/performance-arts",
  roleSlug: "companion",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
