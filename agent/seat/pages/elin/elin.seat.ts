import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a0c4bf-3759-7000-a725-3aa0fd7b2e15",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "initiative/elin-wandering-inn-wiki",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "950268e7-ab50-42d1-acab-7d20c3788d06",
} as const satisfies Seat
