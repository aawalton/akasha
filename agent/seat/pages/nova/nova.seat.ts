import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a16ff0-eea0-7000-8010-1f046913ee5c",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "10e81cf4-76e9-420f-962d-25a06e6eea65",
  createdAt: "2026-10-24T22:03:43.569Z",
  updatedAt: "2026-10-24T22:03:47.135Z",
} as const satisfies Seat
