import type { Seat } from "../seat.page-type.ts"

export const amy = {
  id: "01a06c3e-3fdd-7000-bc52-ed7402075996",
  pageTypeSlug: "seat",
  slug: "amy",
  personaSlug: "amy",
  assignmentSlug: "domain/alan-harness",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
