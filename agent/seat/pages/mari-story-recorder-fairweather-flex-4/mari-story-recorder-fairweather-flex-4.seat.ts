import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderFairweatherFlex4 = {
  id: "01a102cb-c4a3-7000-a4ae-e5221cc0eefb",
  type: "page-type/seat",
  slug: "mari-story-recorder-fairweather-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
