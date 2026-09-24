import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const olwen = {
  id: "01a0c48f-4201-7000-ba83-55759327b4fd",
  type: "page-type/seat",
  slug: "olwen",
  persona: "persona/olwen",
  assignmentSlug: "initiative/olwen-design-system",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "83a9287d-116f-47b8-9c91-db37bf4a3f95",
} as const satisfies Seat
