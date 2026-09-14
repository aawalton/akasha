import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const nimue = {
  id: "01a0a1e6-72ca-7000-a55a-0ebbe84c0ca4",
  type: "seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "initiative/nimue-new-models",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "74abe9de-b960-4460-b4ff-186e2b95e2e0",
} as const satisfies Seat
