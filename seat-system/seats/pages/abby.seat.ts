import type { Seat } from "../seat.page-type.ts"

export const abby = {
  id: "01a077ce-e534-7000-a6d6-894439e82f19",
  pageTypeSlug: "seat",
  slug: "abby",
  personaSlug: "abby",
  assignmentSlug: "domain/all-about-alan",
  roleSlug: "interviewer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
