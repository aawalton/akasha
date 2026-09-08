import type { Seat } from "../seat.page-type.ts"

export const sophia = {
  id: "01a07e60-9184-7000-a492-0c447244dbee",
  pageTypeSlug: "seat",
  slug: "sophia",
  personaSlug: "sophia",
  assignmentSlug: "workspace-package/persona",
  roleSlug: "persona-craft",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
