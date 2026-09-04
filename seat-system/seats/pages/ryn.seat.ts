import type { Seat } from "../seat.page-type.ts"

export const ryn = {
  id: "01a06c47-5b71-7000-bab3-06f11b6b9fcf",
  pageTypeSlug: "seat",
  slug: "ryn",
  personaSlug: "ryn",
  assignmentSlug: "workspace-package/domain-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
