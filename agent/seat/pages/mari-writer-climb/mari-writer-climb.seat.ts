import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterClimb = {
  id: "01a0f959-512d-7000-8a68-442a0533648b",
  type: "page-type/seat",
  slug: "mari-writer-climb",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "613be97a-c44b-4b23-a064-b5ac93627444",
} as const satisfies Seat
