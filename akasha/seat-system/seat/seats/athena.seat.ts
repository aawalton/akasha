import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a05326-f353-7000-aa4a-59d4501bfa32",
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
