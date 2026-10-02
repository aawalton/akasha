import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariStoryRecorderSaltAndLamplightFlex1 = {
  id: "01a0fd29-9e79-7000-ab2a-89130a4b7aea",
  type: "page-type/seat",
  slug: "mari-story-recorder-salt-and-lamplight-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/salt-and-lamplight",
  role: "role/story-recorder",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
