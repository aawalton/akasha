import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderFairweatherFlex5 = {
  id: "01a102bb-14d2-7000-b363-5d9d3def1ea1",
  type: "page-type/seat",
  slug: "mari-story-recorder-fairweather-flex-5",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
