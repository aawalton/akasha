import type { Seat } from "../seat.page-type.ts"

export const amy = {
  id: "01a087b5-1ca3-7000-bf5c-16aae1620c39",
  pageTypeSlug: "seat",
  slug: "amy",
  persona: "amy",
  assignmentSlug: "domain/alan-harness",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
