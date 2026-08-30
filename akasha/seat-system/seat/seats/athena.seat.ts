import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a054b0-184a-7000-a86b-c500ebce8ea0",
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
