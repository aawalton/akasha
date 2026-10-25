import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const jenny = {
  id: "01a1747b-bba0-7000-b8af-48e61ace8af9",
  type: "page-type/seat",
  slug: "jenny",
  persona: "persona/claudius",
  assignmentSlug: "person/jenny",
  role: "role/handler",
  persons: ["person/jenny"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "d0b1ad94-cca8-45b9-b294-176d5ce760c8",
  createdAt: "2026-10-25T19:13:48.881Z",
  updatedAt: "2026-10-25T19:13:52.256Z",
} as const satisfies Seat
