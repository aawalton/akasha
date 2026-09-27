import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderOtherwhereFlex1 = {
  id: "01a0e4b3-c586-7000-83f0-5abc6d918a46",
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
