import type { Seat } from "../seat.page-type.ts"

export const awen = {
  id: "01a0819a-d5a3-7000-9f2b-fd1de46589a2",
  pageTypeSlug: "seat",
  slug: "awen",
  personaSlug: "awen",
  assignmentSlug: "domain/story-engine",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
