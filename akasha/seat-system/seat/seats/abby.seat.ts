import type { Seat } from "../seat.page-type.ts"

export const abby = {
  id: "01a057f7-e770-7000-a840-99ef1469336c",
  pageTypeSlug: "seat",
  slug: "abby",
  personaSlug: "abby",
  assignmentSlug: "domain/all-about-alan",
  roleSlug: "interviewer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "c3b363f8-bf70-4129-98a2-0c2f7b54e855",
} as const satisfies Seat
