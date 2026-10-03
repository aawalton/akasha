import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderHollowmereFlex2 = {
  id: "01a101b9-d24f-7000-858f-db317b681ebe",
  type: "page-type/seat",
  slug: "mari-story-recorder-hollowmere-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
