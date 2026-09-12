import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const astra = {
  id: "01a09565-2098-7000-a8f2-4aa74a5bd9f5",
  type: "seat",
  slug: "astra",
  persona: "astra",
  assignmentSlug: "initiative/astra-index-cleanup",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "48fd8798-a090-423d-82ce-9ff1654f9c70",
} as const satisfies Seat
