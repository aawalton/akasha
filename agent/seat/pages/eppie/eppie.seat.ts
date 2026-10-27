import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const eppie = {
  id: "01a17ef4-ae6a-773d-b35e-e89985a9f284",
  type: "page-type/seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "domain/music",
  role: "role/companion",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T20:02:07.661Z",
  updatedAt: "2026-10-27T20:02:07.661Z",
} as const satisfies Seat
