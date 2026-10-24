import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const regretCheck = {
  id: "01a1704c-7582-72f5-b7ea-ed90ff6321ad",
  type: "page-type/seat",
  slug: "regret-check",
  assignmentSlug: "domain/akasha",
  persona: "persona/claude",
  role: "role/worker",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  persons: ["person/alan"],
  createdAt: "2026-10-24T23:43:41.441Z",
  updatedAt: "2026-10-24T23:43:41.441Z",
} as const satisfies Seat
