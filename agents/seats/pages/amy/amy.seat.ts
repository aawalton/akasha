import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const amy = {
  id: "01a0953e-6059-7000-8c46-01a65c8ef68f",
  type: "seat",
  slug: "amy",
  persona: "amy",
  assignmentSlug: "domain/alan-harness",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "de9910aa-3e02-49a2-853d-0491a301e8d1",
} as const satisfies Seat
