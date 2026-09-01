import type { Seat } from "../seat.page-type.ts"

export const aelwyn = {
  id: "01a05db8-1115-7000-a5d9-10bf87a83a32",
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
