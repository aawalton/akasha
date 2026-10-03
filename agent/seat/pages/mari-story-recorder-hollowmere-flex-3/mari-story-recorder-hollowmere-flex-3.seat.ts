import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderHollowmereFlex3 = {
  id: "01a10205-a7d0-7000-9093-b7930b6b4596",
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
