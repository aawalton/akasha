import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderFairweatherFlex3 = {
  id: "01a102cb-9ea4-7000-a9cb-ebcd05c17dfd",
  type: "page-type/seat",
  slug: "mari-story-recorder-fairweather-flex-3",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
