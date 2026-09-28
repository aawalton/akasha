import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderOtherwhereX = {
  id: "01a0ea61-c13d-7000-a1d8-29e434aa243c",
  type: "page-type/seat",
  slug: "iris-world-builder-otherwhere-x",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
