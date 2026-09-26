import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderTheDatingGame = {
  id: "01a0defe-8568-7000-a815-a177e12a66cc",
  type: "page-type/seat",
  slug: "mari-world-builder-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
