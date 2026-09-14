import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const eppie = {
  id: "01a09b60-8172-7000-b9b7-86a3019abbf7",
  type: "seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "initiative/eppie-music-improvements",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "22f49c3e-98e8-434f-ae6c-b384f82b2cb0",
} as const satisfies Seat
