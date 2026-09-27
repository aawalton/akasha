import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerTheDatingGameFlex1 = {
  id: "01a0e33f-b143-7000-8db6-da58931a83b3",
  type: "page-type/seat",
  slug: "mari-reviewer-the-dating-game-flex-1",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
