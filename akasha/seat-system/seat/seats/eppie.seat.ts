import type { Seat } from "../seat.page-type.ts"

export const eppie = {
  id: "01a06219-9bdf-7000-a00a-7d8e51d8d5a7",
  pageTypeSlug: "seat",
  slug: "eppie",
  personaSlug: "eppie",
  assignmentSlug: "domain/performance-arts",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "c640297b-fbe4-4795-8ddd-9644be649739",
} as const satisfies Seat
