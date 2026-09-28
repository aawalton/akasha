import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a0e972-d349-7000-a5bd-1c4af49e9aca",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "20dacdc1-b3c3-4474-b958-673402a1975c",
} as const satisfies Seat
