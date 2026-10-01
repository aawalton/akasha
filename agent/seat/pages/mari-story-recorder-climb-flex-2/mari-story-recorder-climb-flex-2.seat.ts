import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderClimbFlex2 = {
  id: "01a0f964-5905-7000-8aa2-513c4e749d94",
  type: "page-type/seat",
  slug: "mari-story-recorder-climb-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/climb",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
