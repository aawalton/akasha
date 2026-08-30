import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a054ac-5a07-7000-9202-8203b8d5b956",
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
