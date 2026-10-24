import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a11baf-5fc0-7000-85d2-7cfbcbde7521",
  type: "page-type/seat",
  slug: "ember",
  persona: "persona/ember",
  assignmentSlug: "domain/temper",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "ac6968ad-6eb5-4c34-ae8f-aa497a591196",
  createdAt: "2026-10-20T17:23:03.843Z",
  updatedAt: "2026-10-24T17:50:28.120Z",
} as const satisfies Seat
