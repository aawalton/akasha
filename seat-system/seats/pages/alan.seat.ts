import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a071f9-a791-7000-8d94-a3c5c47b3c4c",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "4bf2f67c-97ed-4b0e-9e3f-ecc22ea41826",
} as const satisfies Seat
