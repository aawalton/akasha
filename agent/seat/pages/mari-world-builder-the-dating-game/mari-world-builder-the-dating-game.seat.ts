import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderTheDatingGame = {
  id: "01a0e051-cb8e-7000-9665-e78ce90c8b77",
  type: "page-type/seat",
  slug: "mari-world-builder-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
