import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderOtherwhereFlex1 = {
  id: "01a0e5b2-9289-7000-a01f-d21e40342e84",
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
