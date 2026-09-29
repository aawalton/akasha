import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex1 = {
  id: "01a0eb6e-ba7e-7000-9f24-62ab0aaed56c",
  type: "page-type/seat",
  slug: "mari-reviewer-harem-hotel-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
