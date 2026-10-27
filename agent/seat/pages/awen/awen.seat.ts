import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const awen = {
  id: "01a17e8c-f01b-764a-b33e-8c55826ca631",
  type: "page-type/seat",
  slug: "awen",
  persona: "persona/awen",
  assignmentSlug: "initiative/awen-story-engine-v3",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "8926f5c5-a2cc-48f2-b360-047628ae14a6",
  createdAt: "2026-10-27T18:08:48.505Z",
  updatedAt: "2026-10-27T18:19:06.953Z",
} as const satisfies Seat
