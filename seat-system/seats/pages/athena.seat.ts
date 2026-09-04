import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a06c3f-5e2f-7000-9cac-f9a5a423e91f",
  pageTypeSlug: "seat",
  slug: "athena",
  personaSlug: "athena",
  assignmentSlug: "page-type/agent",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "224c28cf-525f-4b1a-8e02-c9ee0c7a3487",
} as const satisfies Seat
