import type { Seat } from "../seat.page-type.ts"

export const ali = {
  id: "01a077d5-da5b-7000-94f9-96dfc32eb53a",
  pageTypeSlug: "seat",
  slug: "ali",
  personaSlug: "ali",
  assignmentSlug: "domain/learn-everything",
  roleSlug: "interviewer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
