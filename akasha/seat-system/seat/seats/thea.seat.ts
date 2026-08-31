import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a058ca-b19b-7000-a487-eb2b44238542",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "domain/checks-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "45267a47-e43e-480a-93a8-860f698372e4",
} as const satisfies Seat
