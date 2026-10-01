import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderClimbFlex3 = {
  id: "01a0f96f-9ec3-7000-8644-ec792038b0ef",
  type: "page-type/seat",
  slug: "mari-story-recorder-climb-flex-3",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
