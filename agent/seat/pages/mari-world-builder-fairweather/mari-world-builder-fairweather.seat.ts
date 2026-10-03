import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderFairweather = {
  id: "01a1036a-4716-7000-a2bc-b13a702bb7c4",
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
