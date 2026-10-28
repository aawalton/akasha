import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a182d8-35a9-7589-8cb4-2e1a3d50e207",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "a2c3cdad-ab8c-43e7-8a36-39cc7a8ee212",
  createdAt: "2026-10-28T14:09:30.417Z",
  updatedAt: "2026-10-28T14:09:33.469Z",
} as const satisfies Seat
