import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderOtherwhereFlex3 = {
  id: "01a0e527-f8d6-7000-9861-281d2691bb32",
  type: "page-type/seat",
  slug: "iris-story-recorder-otherwhere-flex-3",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
