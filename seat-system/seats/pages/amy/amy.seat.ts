import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const amy = {
  id: "01a09119-482d-7000-ac31-8de210bea120",
  type: "seat",
  slug: "amy",
  persona: "amy",
  assignmentSlug: "domain/alan-harness",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
