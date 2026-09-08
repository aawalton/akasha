import type { Seat } from "../seat.page-type.ts"

export const amy = {
  id: "01a07e83-7b6c-7000-a876-5c2d08753493",
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
