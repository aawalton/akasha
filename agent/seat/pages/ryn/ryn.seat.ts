import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ryn = {
  id: "01a0c52c-858d-7000-b106-658812535089",
  type: "page-type/seat",
  slug: "ryn",
  persona: "persona/ryn",
  assignmentSlug: "initiative/ryn-standard-agent-english",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "736f6f9c-fd07-41a2-ad52-572238bd600f",
} as const satisfies Seat
