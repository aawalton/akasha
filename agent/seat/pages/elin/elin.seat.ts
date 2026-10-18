import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a14fa2-9498-7000-90fe-bdb948beb9a8",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "c57fc26e-2d39-40e0-804a-029c3db451bc",
  createdAt: "2026-10-18T15:30:17.803Z",
  updatedAt: "2026-10-18T15:30:20.546Z",
} as const satisfies Seat
