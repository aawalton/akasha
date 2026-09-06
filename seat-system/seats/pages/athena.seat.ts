import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a0784a-9067-7000-b710-8f580d7289ef",
  pageTypeSlug: "seat",
  slug: "athena",
  personaSlug: "athena",
  assignmentSlug: "workspace-package/agent",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
