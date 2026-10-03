import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderFairweather = {
  id: "01a102a0-aa46-7000-9f5a-cb3001cec17b",
  type: "page-type/seat",
  slug: "mari-world-builder-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "94541df4-79c6-4fee-aa0f-502c17394495",
} as const satisfies Seat
