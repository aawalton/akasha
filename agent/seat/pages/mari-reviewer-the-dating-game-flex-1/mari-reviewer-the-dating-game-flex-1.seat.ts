import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerTheDatingGameFlex1 = {
  id: "01a0e80f-08d4-7000-81b7-ffcd31630803",
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
