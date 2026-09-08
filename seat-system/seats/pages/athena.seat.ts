import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a08197-ca18-7000-96a6-c880b5f44819",
  pageTypeSlug: "seat",
  slug: "athena",
  personaSlug: "athena",
  assignmentSlug: "workspace-package/agent",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
