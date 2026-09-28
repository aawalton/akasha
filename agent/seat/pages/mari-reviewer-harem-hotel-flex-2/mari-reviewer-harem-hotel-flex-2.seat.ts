import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex2 = {
  id: "01a0e850-9a48-7000-b20e-b104ad499a74",
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
