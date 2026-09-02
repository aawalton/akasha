import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a059e5-94bf-7000-b19a-c1c6cb3bbb49",
  pageTypeSlug: "seat",
  slug: "athena",
  personaSlug: "athena",
  assignmentSlug: "initiative/athena-model-gateway-into-akasha",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "18b641a7-20a5-4638-8ab3-5a75268ff0d6",
} as const satisfies Seat
