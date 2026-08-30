import type { Seat } from "../seat.page-type.ts"

export const amy = {
  id: "01a05318-95f7-7000-8337-8cdabc7ff145",
  pageTypeSlug: "seat",
  slug: "amy",
  personaSlug: "amy",
  assignmentSlug: "domain/alan-harness",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
