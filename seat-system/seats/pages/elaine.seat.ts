import type { Seat } from "../seat.page-type.ts"

export const elaine = {
  id: "01a08064-3621-7000-87c7-0fa032433b8d",
  pageTypeSlug: "seat",
  slug: "elaine",
  personaSlug: "elaine",
  assignmentSlug: "domain/medicine",
  roleSlug: "coach",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
