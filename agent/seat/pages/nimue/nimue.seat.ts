import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nimue = {
  id: "01a15513-cad9-7000-89f4-a97e9c07d220",
  type: "page-type/seat",
  slug: "nimue",
  persona: "persona/nimue",
  assignmentSlug: "initiative/nimue-correct-formulas",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "885728eb-a579-4158-9e5a-d48265245180",
  createdAt: "2026-10-19T16:52:03.328Z",
  updatedAt: "2026-10-24T17:50:28.120Z",
} as const satisfies Seat
