import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderHollowmereFlex3 = {
  id: "01a101ca-5d2c-7000-9b16-913cd3020603",
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
