import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderHollowmereFlex3 = {
  id: "01a101ab-c887-7000-8bde-ea7e7479c64d",
  type: "page-type/seat",
  slug: "mari-story-recorder-hollowmere-flex-3",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
