import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11c1e-e952-7000-9d3e-a0489e99aee9",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "3222b479-9572-499d-a8e0-1bf5ec09c95e",
  updatedAt: "2026-10-08T15:26:08.295Z",
} as const satisfies Seat
