import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a054b0-dd1b-7000-9df3-226508a74c75",
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
