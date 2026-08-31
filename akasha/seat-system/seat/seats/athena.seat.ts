import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a059e5-94bf-7000-b19a-c1c6cb3bbb49",
  pageTypeSlug: "seat",
  slug: "athena",
  personaSlug: "athena",
  assignmentSlug: "domain/agent-harness",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
