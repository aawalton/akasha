import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a182dd-0f11-76f3-8533-b785827e2aee",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "e40a123c-57f6-4904-814d-39aa1580bfdc",
  createdAt: "2026-10-28T14:14:48.175Z",
  updatedAt: "2026-10-28T14:14:50.971Z",
} as const satisfies Seat
