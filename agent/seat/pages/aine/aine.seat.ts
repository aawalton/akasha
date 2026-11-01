import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a19892-e962-7712-acc7-4f85e2db6eb5",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "namespace/finding",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "17ba54fd-b576-460e-87ae-298bb6586507",
  createdAt: "2026-11-01T19:25:27.693Z",
  updatedAt: "2026-11-01T19:25:30.743Z",
} as const satisfies Seat
