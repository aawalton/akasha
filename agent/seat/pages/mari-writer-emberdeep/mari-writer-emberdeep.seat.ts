import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterEmberdeep = {
  id: "01a0fdb4-356b-7000-801f-afe81c6fdd67",
  type: "page-type/seat",
  slug: "mari-writer-emberdeep",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "0044ba0f-167a-486f-9991-0ca57ab393ce",
} as const satisfies Seat
