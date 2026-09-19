import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const awen = {
  id: "01a0b706-afe2-7000-b0a0-2ba202a68a29",
  type: "page-type/seat",
  slug: "awen",
  persona: "persona/awen",
  assignmentSlug: "initiative/awen-engine-improvements",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "ad9ce90f-6b1b-426f-8c7b-769c74b4b957",
} as const satisfies Seat
