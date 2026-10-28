import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elaine = {
  id: "01a1839f-5cac-73fe-af2e-73278a3e7f99",
  type: "page-type/seat",
  slug: "elaine",
  persona: "persona/elaine",
  assignmentSlug: "initiative/elaine-health-model",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "ce5b32ba-9490-4451-b567-e8a88aa09d42",
  createdAt: "2026-10-28T17:47:02.052Z",
  updatedAt: "2026-10-28T17:48:45.635Z",
} as const satisfies Seat
