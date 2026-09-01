import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a05db3-f415-7000-8fdd-b052939f1aa7",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "workspace-package/checks-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
