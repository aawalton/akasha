import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a06c1b-1c7f-7000-bd7d-56ae0f7c0f61",
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
