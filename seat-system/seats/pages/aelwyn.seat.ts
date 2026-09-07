import type { Seat } from "../seat.page-type.ts"

export const aelwyn = {
  id: "01a07ceb-63ec-7000-9477-5a923beff3be",
  pageTypeSlug: "seat",
  slug: "aelwyn",
  personaSlug: "aelwyn",
  assignmentSlug: "domain/fitness",
  roleSlug: "coach",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
