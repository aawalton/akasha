import type { Seat } from "../seat.page-type.ts"

export const sophia = {
  id: "01a07297-ed81-7000-9e92-5a582c23c5b8",
  pageTypeSlug: "seat",
  slug: "sophia",
  personaSlug: "sophia",
  assignmentSlug: "page-type/persona",
  roleSlug: "persona-craft",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
