import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderClimb = {
  id: "01a0f959-35e5-7000-a869-8a1172c5821b",
  type: "page-type/seat",
  slug: "mari-world-builder-climb",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "2f459ba4-cf1d-4ce0-9352-fdc5791aac49",
} as const satisfies Seat
