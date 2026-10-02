import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderHollowmereFlex1 = {
  id: "01a0fe8c-3ddb-7000-9b19-3b7182d85586",
  type: "page-type/seat",
  slug: "mari-story-recorder-hollowmere-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/hollowmere",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
