import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a126b0-9b15-7000-b4f3-f7da3d63d6a2",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "00acaa8e-27bd-4b6a-9b90-972fb022d764",
  createdAt: "2026-10-10T16:41:11.158Z",
  updatedAt: "2026-10-10T16:41:14.152Z",
} as const satisfies Seat
