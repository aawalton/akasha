import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a054b2-2896-7000-87f4-29c11a79bd4f",
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
