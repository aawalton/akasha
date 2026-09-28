import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerTheDatingGameFlex2 = {
  id: "01a0e596-377b-7000-8026-aac916e31bc3",
  type: "page-type/seat",
  slug: "mari-reviewer-the-dating-game-flex-2",
  persona: "persona/mari",
  assignmentSlug: "story-played/the-dating-game",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat
