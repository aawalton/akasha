import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterTheDatingGame = {
  id: "01a0e307-0186-7000-adc0-3489e796cec4",
  type: "page-type/seat",
  slug: "mari-writer-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "d59fb9c1-2b9c-4a94-a60b-871c0d41cf8e",
} as const satisfies Seat
