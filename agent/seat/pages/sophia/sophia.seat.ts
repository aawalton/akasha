import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const sophia = {
  id: "01a11c30-ae3c-7000-8769-c7a1968d0dcd",
  type: "page-type/seat",
  slug: "sophia",
  persona: "persona/sophia",
  assignmentSlug: "page-type/persona",
  role: "role/persona-craft",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "730098b2-8446-453c-9d1b-31c8c4da4135",
  createdAt: "2026-10-08T15:45:14.812Z",
  updatedAt: "2026-10-08T15:45:19.000Z",
} as const satisfies Seat
