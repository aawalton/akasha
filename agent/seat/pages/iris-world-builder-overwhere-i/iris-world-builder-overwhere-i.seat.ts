import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderOverwhereI = {
  id: "01a0ed0e-398e-7000-ba63-1c2b6b29144c",
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
