import type { Seat } from "../seat.page-type.ts"

export const nimue = {
  id: "01a081bf-5e17-7000-9dd9-4e001f01ce37",
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
