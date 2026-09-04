import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a06c2f-aaa0-7000-bb52-d4a88ab44069",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "0ae76d1b-ffe0-492d-a330-30af798b6796",
} as const satisfies Seat
