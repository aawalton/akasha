import type { Seat } from "../seat.page-type.ts"

export const olwen = {
  id: "01a0819a-fa12-7000-9c6e-51368756ed87",
  pageTypeSlug: "seat",
  slug: "olwen",
  personaSlug: "olwen",
  assignmentSlug: "workspace-package/design-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
