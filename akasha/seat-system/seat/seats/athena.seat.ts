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
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "234132e2-31cf-48ef-ac1e-76d9c95305d5",
} as const satisfies Seat
