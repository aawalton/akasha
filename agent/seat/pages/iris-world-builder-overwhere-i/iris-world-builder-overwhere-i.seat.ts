import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderOverwhereI = {
  id: "01a103cc-1cd0-7000-bca4-1617d97655da",
  type: "page-type/seat",
  slug: "iris-world-builder-overwhere-i",
  persona: "persona/iris",
  assignmentSlug: "story-played/overwhere-i",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
