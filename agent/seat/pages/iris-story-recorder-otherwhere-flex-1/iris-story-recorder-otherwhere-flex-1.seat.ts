import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderOtherwhereFlex1 = {
  id: "01a0e54d-91d0-7000-8a84-ba90ee6b12cd",
  type: "page-type/seat",
  slug: "iris-story-recorder-otherwhere-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
