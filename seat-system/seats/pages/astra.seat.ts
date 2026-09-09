import type { Seat } from "../seat.page-type.ts"

export const astra = {
  id: "01a0873b-6b46-7000-8c31-d90227ba00fa",
  pageTypeSlug: "seat",
  slug: "astra",
  personaSlug: "astra",
  assignmentSlug: "workspace-package/page",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
