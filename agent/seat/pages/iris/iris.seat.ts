import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const iris = {
  id: "01a0e348-87c3-7000-92ae-99d2bafd763b",
  type: "page-type/seat",
  slug: "iris",
  persona: "persona/iris",
  assignmentSlug: "domain/akasha",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "cdc1bbc3-6764-4089-8625-54669fd58b26",
} as const satisfies Seat
