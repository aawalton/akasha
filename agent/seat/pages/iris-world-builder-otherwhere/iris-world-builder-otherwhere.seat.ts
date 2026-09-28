import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderOtherwhere = {
  id: "01a0e985-a84f-7000-9acc-20476e8e941f",
  type: "page-type/seat",
  slug: "iris-world-builder-otherwhere",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "f6c0d111-ba74-497a-aa4d-a31932217951",
} as const satisfies Seat
