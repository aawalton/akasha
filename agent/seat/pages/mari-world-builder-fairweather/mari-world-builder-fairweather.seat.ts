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
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "317b816d-7c37-4f7e-98f4-f051db083ae2",
} as const satisfies Seat
