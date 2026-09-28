import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerHaremHotelFlex1 = {
  id: "01a0e83d-019b-7000-8724-a46bf73dde2b",
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
