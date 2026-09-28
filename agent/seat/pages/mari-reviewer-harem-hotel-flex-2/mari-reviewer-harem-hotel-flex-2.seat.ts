import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex2 = {
  id: "01a0e993-326c-7000-a5f9-e3e52a4608f1",
  type: "page-type/seat",
  slug: "mari-reviewer-harem-hotel-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
