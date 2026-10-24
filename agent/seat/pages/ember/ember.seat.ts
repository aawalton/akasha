import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ember = {
  id: "01a16f6d-fb1f-7000-9c32-434120971efc",
  type: "page-type/seat",
  slug: "ember",
  persona: "persona/ember",
  assignmentSlug: "domain/temper",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "00dafabc-56cd-4c68-a44d-08cacc40093e",
  createdAt: "2026-10-24T19:40:41.514Z",
  updatedAt: "2026-10-24T19:40:44.097Z",
} as const satisfies Seat
