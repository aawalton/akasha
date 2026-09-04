import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a06c1b-1c7f-7000-bd7d-56ae0f7c0f61",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "workspace-package/checks",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "7277ef71-4897-40d9-a2f7-1d9dcc6fbc77",
} as const satisfies Seat
