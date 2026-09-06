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
  claudeCodeSessionUuid: "37c54386-3e31-4a8a-946f-f0617036cfb6",
} as const satisfies Seat
