import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderOtherwhereFlex2 = {
  id: "01a0e55b-ceda-7000-ab87-fad622e86ee1",
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
