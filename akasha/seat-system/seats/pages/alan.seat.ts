import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06549-e02e-7000-a03d-0bc33bec769b",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "ea5e6d6e-2b83-4a4a-9115-db2225b5bdc3",
} as const satisfies Seat
