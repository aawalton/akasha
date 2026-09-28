import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderOtherwhereV = {
  id: "01a0e9e5-25e2-7000-98dd-9824cb3b50ae",
  type: "page-type/seat",
  slug: "iris-world-builder-otherwhere-v",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-v",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
