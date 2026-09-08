import type { Seat } from "../seat.page-type.ts"

export const astra = {
  id: "01a0818a-6c9c-7000-a31c-15707bf33fdf",
  pageTypeSlug: "seat",
  slug: "astra",
  personaSlug: "astra",
  assignmentSlug: "workspace-package/page",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
