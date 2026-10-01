import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderClimbFlex1 = {
  id: "01a0f964-3cf3-7000-9dc9-71c2a9247ac8",
  type: "page-type/seat",
  slug: "mari-story-recorder-climb-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
