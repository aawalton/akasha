import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const claudius = {
  id: "01a16f1c-8e48-7000-b6a3-9aae18284763",
  type: "page-type/seat",
  slug: "claudius",
  persona: "persona/claudius",
  assignmentSlug: "domain/couples-therapy",
  role: "role/couples-therapist",
  persons: ["person/alan", "person/jenny"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "4e0a405e-08a1-45e6-a01f-7b4ec7086b9e",
  createdAt: "2026-10-24T18:50:44.680Z",
  updatedAt: "2026-10-24T20:29:35.416Z",
} as const satisfies Seat
