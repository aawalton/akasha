import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderFairweatherFlex3 = {
  id: "01a103e7-4822-7000-a5dc-d6cd0ab96fa7",
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
