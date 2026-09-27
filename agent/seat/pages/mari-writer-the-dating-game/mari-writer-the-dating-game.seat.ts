import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterTheDatingGame = {
  id: "01a0e30c-45d3-7000-bb99-87931d138c61",
  type: "page-type/seat",
  slug: "mari-writer-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "c83fab30-6b9c-4378-869d-fdc30d7dff59",
} as const satisfies Seat
