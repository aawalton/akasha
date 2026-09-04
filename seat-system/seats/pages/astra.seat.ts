import type { Seat } from "../seat.page-type.ts"

export const astra = {
  id: "01a06cc1-b8b6-7000-9b5b-981f71892744",
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
