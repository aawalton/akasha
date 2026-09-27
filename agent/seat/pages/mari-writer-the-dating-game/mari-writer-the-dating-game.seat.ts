import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterTheDatingGame = {
  id: "01a0e06e-c9ad-7000-914d-92da75e0e375",
  type: "page-type/seat",
  slug: "mari-writer-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "3f85c844-caad-41e8-8ef6-d4bc9bfc7a11",
} as const satisfies Seat
