import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex1 = {
  id: "01a0eb7c-87d6-7000-a5bc-6da3e34ff826",
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
