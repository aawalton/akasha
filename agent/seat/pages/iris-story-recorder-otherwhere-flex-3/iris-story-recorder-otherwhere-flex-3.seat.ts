import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderOtherwhereFlex3 = {
  id: "01a0e562-aa52-7000-979f-959bac53c7e8",
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
