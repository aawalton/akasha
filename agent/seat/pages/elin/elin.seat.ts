import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a0de72-919f-7000-9d91-e4b5093faf1b",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "initiative/elin-image-library-management",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "9d9f4d80-e431-44d6-b335-38de87d154d6",
} as const satisfies Seat
