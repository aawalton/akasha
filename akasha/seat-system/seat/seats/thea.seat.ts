import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a04e50-a98d-7000-9182-d3565f0eee22",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "domain/checks-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "bb1a57b9-ae2a-486a-95db-8b3a5ced3d4d",
} as const satisfies Seat
