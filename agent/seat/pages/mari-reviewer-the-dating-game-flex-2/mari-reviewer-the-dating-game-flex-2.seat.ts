import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerTheDatingGameFlex2 = {
  id: "01a0e3a3-5c7e-7000-94be-e62e123227ee",
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
