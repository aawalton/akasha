import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterSaltAndLamplight = {
  id: "01a0fd06-cd40-7000-b94b-b6c318e16153",
  type: "page-type/seat",
  slug: "mari-writer-salt-and-lamplight",
  persona: "persona/mari",
  assignmentSlug: "story-written/salt-and-lamplight",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
