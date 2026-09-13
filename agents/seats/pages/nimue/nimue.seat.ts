import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const nimue = {
  id: "01a09b65-939a-7000-ac9c-dcb0209439e2",
  type: "seat",
  slug: "nimue",
  persona: "nimue",
  assignmentSlug: "domain/technology",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "6585c2af-6773-4efa-81a3-404d6ebe8da6",
} as const satisfies Seat
