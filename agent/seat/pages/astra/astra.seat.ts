import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const astra = {
  id: "01a0ba41-773c-7000-baa1-9afa8d8c43d0",
  type: "page-type/seat",
  slug: "astra",
  persona: "persona/astra",
  assignmentSlug: "namespace/page",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "ed20d825-6092-4b97-9382-d2ac49b2dce4",
} as const satisfies Seat
