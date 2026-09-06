import type { Seat } from "../seat.page-type.ts"

export const nimue = {
  id: "01a07772-756c-7000-b170-6d15648fc9be",
  pageTypeSlug: "seat",
  slug: "nimue",
  personaSlug: "nimue",
  assignmentSlug: "domain/technology",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
