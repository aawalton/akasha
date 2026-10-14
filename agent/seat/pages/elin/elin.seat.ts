import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a13bbf-42ca-7000-890e-8aa55676e506",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0713b3bc-68d5-49a7-988b-64d9891a9c79",
  createdAt: "2026-10-14T18:49:13.121Z",
  updatedAt: "2026-10-14T18:49:16.231Z",
} as const satisfies Seat
