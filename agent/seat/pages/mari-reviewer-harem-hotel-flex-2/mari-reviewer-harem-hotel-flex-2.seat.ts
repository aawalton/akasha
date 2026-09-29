import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex2 = {
  id: "01a0eb6e-ce65-7000-b10d-227820573220",
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
