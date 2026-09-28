import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderOtherwhereFlex2 = {
  id: "01a0e854-9003-7000-9c67-6b75fb05475d",
  type: "page-type/seat",
  slug: "iris-story-recorder-otherwhere-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
