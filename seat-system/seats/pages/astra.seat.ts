import type { Seat } from "../seat.page-type.ts"

export const astra = {
  id: "01a06cd6-841c-7000-873e-4c76fc0be224",
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
