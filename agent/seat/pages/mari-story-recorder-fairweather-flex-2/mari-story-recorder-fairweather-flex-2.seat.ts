import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderFairweatherFlex2 = {
  id: "01a103a1-9bb9-7000-8936-106c5b82c595",
  type: "page-type/seat",
  slug: "mari-story-recorder-fairweather-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
