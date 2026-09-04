import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a06c3f-5e2f-7000-9cac-f9a5a423e91f",
  pageTypeSlug: "seat",
  slug: "athena",
  personaSlug: "athena",
  assignmentSlug: "domain/agent-harness",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
