import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a170ee-e2ba-7000-9887-255de29362c3",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "6fc7213a-70d9-4dfc-be82-4b1824c6cb78",
  createdAt: "2026-10-25T02:41:06.649Z",
  updatedAt: "2026-10-25T02:41:10.192Z",
} as const satisfies Seat
