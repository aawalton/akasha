import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderFairweather = {
  id: "01a10386-fe61-7000-9dfe-a147de3e2e29",
  type: "page-type/seat",
  slug: "mari-world-builder-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
