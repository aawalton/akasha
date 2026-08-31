import type { Seat } from "../seat.page-type.ts"

export const thea = {
  id: "01a05a0f-267b-7000-b46a-cbbf6c46f0f9",
  pageTypeSlug: "seat",
  slug: "thea",
  personaSlug: "thea",
  assignmentSlug: "workspace-package/checks-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "7ff942fe-66bc-4e5e-82f5-cd7672a53698",
} as const satisfies Seat
