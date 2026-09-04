import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a06c1b-357d-7000-8485-3d672018e0d2",
  pageTypeSlug: "seat",
  slug: "athena",
  personaSlug: "athena",
  assignmentSlug: "domain/agent-harness",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "3e6377a2-190f-4f72-b292-a9e9ea4af993",
} as const satisfies Seat
