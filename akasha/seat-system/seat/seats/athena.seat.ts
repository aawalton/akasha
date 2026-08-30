import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a054b4-8206-7000-a9c0-8af4a3addb61",
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
