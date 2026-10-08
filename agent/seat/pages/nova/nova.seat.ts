import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11c2e-bda3-7000-ae52-60c86d2ec07c",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "43066326-d834-41da-b197-001b6db7bc8f",
} as const satisfies Seat
