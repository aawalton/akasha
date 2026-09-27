import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerTheDatingGameFlex1 = {
  id: "01a0e318-209d-7000-8329-0250ee966eb8",
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
