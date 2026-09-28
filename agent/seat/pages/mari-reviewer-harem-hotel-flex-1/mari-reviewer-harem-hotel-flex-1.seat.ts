import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex1 = {
  id: "01a0e845-0716-7000-b033-de53299f151a",
  type: "page-type/seat",
  slug: "mari-reviewer-harem-hotel-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-played/harem-hotel",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
