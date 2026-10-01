import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderClimbFlex4 = {
  id: "01a0f964-9200-7000-86f2-84157ccd8e95",
  type: "page-type/seat",
  slug: "mari-story-recorder-climb-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
