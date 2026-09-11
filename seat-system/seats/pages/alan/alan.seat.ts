import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const alan = {
  id: "01a08dcf-3137-7000-9144-7005efade59e",
  type: "seat",
  slug: "alan",
  persona: "amy",
  assignmentSlug: "domain/alan",
  role: "handler",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "6e45e952-2649-4c05-adea-c6339f979fad",
} as const satisfies Seat
