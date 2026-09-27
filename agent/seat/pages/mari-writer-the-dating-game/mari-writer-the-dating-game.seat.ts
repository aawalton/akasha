import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterTheDatingGame = {
  id: "01a0e2f9-ddc3-7000-bcc7-dff997eff8a5",
  type: "page-type/seat",
  slug: "mari-writer-the-dating-game",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
