import type { Seat } from "../seat.page-type.ts"

export const vera = {
  id: "01a06cc2-4d2b-7000-86e7-f75d77d5bf24",
  pageTypeSlug: "seat",
  slug: "vera",
  personaSlug: "vera",
  assignmentSlug: "workspace-package/graph-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
