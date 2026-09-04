import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a06c31-1b01-7000-b602-fc1a3f96f3a4",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "workspace-package/checks",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
