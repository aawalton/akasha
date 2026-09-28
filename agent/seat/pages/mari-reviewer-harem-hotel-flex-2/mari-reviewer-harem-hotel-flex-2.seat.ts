import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex2 = {
  id: "01a0e85a-e951-7000-9830-9b4d39615ebd",
  type: "page-type/seat",
  slug: "mari-reviewer-harem-hotel-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-played/harem-hotel",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
