import type { Seat } from "../seat.page-type.ts"

export const olwen = {
  id: "01a06d75-4175-7000-ac04-631a861a42a3",
  pageTypeSlug: "seat",
  slug: "olwen",
  personaSlug: "olwen",
  assignmentSlug: "workspace-package/design-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
