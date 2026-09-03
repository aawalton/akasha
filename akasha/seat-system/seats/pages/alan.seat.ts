import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a067b5-d0db-7000-bf8c-081949e6a78d",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "39939a0e-3ed3-427b-8b2b-23d5b6bacd04",
} as const satisfies Seat
