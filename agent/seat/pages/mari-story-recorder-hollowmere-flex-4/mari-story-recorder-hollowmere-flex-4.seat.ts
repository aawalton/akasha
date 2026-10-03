import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderHollowmereFlex4 = {
  id: "01a101ec-aaf9-7000-9b05-52cfb6d65fcb",
  type: "page-type/seat",
  slug: "mari-story-recorder-hollowmere-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
