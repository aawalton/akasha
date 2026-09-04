import type { Seat } from "../seat.page-type.ts"

export const astra = {
  id: "01a06cc1-b678-7000-8e58-08f45fcc4f22",
  pageTypeSlug: "seat",
  slug: "astra",
  personaSlug: "astra",
  assignmentSlug: "workspace-package/pages-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
