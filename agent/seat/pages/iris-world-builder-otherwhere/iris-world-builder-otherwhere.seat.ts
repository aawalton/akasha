import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderOtherwhere = {
  id: "01a0e357-a6fd-7000-a987-d0c2196ab01d",
  type: "page-type/seat",
  slug: "iris-world-builder-otherwhere",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
