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
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
