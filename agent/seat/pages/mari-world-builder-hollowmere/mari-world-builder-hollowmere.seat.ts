import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderHollowmere = {
  id: "01a0fd11-4ba5-7000-9dee-f345d0139cfa",
  type: "page-type/seat",
  slug: "mari-world-builder-hollowmere",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "57d4baca-845d-405a-905e-c4534993cc2a",
} as const satisfies Seat
