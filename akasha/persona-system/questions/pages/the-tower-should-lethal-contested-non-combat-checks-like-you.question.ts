import type { Question } from "../question.page-type.ts"

export const theTowerShouldLethalContestedNonCombatChecksLikeYou = {
  id: "019f740e-1131-7006-9eb8-a30d0f978f95",
  pageTypeSlug: "question",
  slug: "the-tower-should-lethal-contested-non-combat-checks-like-you",
  ask: "The Tower: should lethal/contested NON-COMBAT checks (like your t87 chasm leap) roll seeded dice, or stay GM-adjudicated?",
  askedBy: "awen",
  askedIn: "019f654c-0298-779d-b934-c4afac310a51",
  status: "answered",
  offered: [
    "Seeded dice for lethal/contested non-combat (awen's lean)",
    "Keep GM judgment everywhere, with audit-trail notes",
    "GM judgment, but dice when I explicitly ask for a roll",
  ],
  answer: "Seeded dice for lethal/contested non-combat (awen's lean)",
  closedAt: "2026-07-18T07:08:43.767Z",
  context: "txt",
} as const satisfies Question
