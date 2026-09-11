import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const aelwyn = {
  id: "01a090ed-0ccf-7000-b711-370c53dfcbb8",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "aelwyn",
  persona: "aelwyn",
  assignmentSlug: "domain/fitness",
  role: "coach",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
