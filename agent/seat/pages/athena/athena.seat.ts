import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a183b2-f232-713a-8949-9f6a7cd9c6d6",
  type: "page-type/seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "namespace/agent",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "1bfa2267-88bc-4249-8c84-63480424c4b3",
  createdAt: "2026-10-28T18:08:25.510Z",
  updatedAt: "2026-10-28T18:08:29.436Z",
} as const satisfies Seat
