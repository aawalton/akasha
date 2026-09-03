import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06740-8af9-7000-af45-773ec40943d0",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "a407f3c6-3580-41c4-948d-a3c346eb51bb",
} as const satisfies Seat
