import type { Seat } from "../seat.page-type.ts"

export const aine = {
  id: "01a05311-e485-7000-87d3-c308c522f615",
  pageTypeSlug: "seat",
  slug: "aine",
  personaSlug: "aine",
  assignmentSlug: "domain/global",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
