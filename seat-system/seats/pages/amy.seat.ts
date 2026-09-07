import type { Seat } from "../seat.page-type.ts"

export const amy = {
  id: "01a06c3e-3fdd-7000-bc52-ed7402075996",
  pageTypeSlug: "seat",
  slug: "amy",
  personaSlug: "amy",
  assignmentSlug: "domain/alan-harness",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "f5a66efa-5011-4df4-bf73-2d94af7f2c7d",
} as const satisfies Seat
