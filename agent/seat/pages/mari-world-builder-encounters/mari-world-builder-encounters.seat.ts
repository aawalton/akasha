import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderEncounters = {
  id: "01a11308-415e-7000-b842-8f27f8776dcc",
  type: "page-type/seat",
  slug: "mari-world-builder-encounters",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "06b04d33-70c5-47a1-800b-03e35529337d",
} as const satisfies Seat
