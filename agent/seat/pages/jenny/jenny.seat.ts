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
  createdAt: "2026-10-25T19:13:48.881Z",
  updatedAt: "2026-10-25T19:13:48.881Z",
} as const satisfies Seat
