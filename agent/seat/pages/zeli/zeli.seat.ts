import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const zeli = {
  id: "01a12261-0904-7000-a7a5-ea01104294ab",
  type: "page-type/seat",
  slug: "zeli",
  persona: "persona/zeli",
  assignmentSlug: "domain/visual-arts",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "4147aa8b-6c42-4e70-93b9-7cc3b24b59c3",
  createdAt: "2026-10-09T20:35:47.541Z",
  updatedAt: "2026-10-09T20:35:50.493Z",
} as const satisfies Seat
