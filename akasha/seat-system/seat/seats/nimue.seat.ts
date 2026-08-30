import type { Seat } from "../seat.page-type.ts"

export const nimue = {
  id: "01a05318-b1de-7000-a477-39d68490ef37",
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
