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
} as const satisfies Seat
