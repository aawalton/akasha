import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const nimue = {
  id: "01a0a0ac-e99d-7000-9a90-e2454174c879",
  type: "seat",
  slug: "nimue",
  persona: "nimue",
  assignmentSlug: "domain/technology",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "b98a11cb-2982-4155-bcc1-c3f6007996a2",
} as const satisfies Seat
