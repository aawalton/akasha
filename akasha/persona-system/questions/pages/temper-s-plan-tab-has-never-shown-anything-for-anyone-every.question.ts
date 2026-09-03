import type { Question } from "../question.page-type.ts"

export const temperSPlanTabHasNeverShownAnythingForAnyoneEvery = {
  id: "019f9944-98d9-717f-9279-062cbff42125",
  pageTypeSlug: "question",
  slug: "temper-s-plan-tab-has-never-shown-anything-for-anyone-every",
  ask: "Temper's Plan tab has never shown anything for anyone. Every synced character already carries its full in-game build in the database — nothing turns it into a Plan card. When a character syncs, what should Temper do?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "A) Attach it as their LIVE build — Plan shows what they are running now, and they set a target when they want one.",
    "B) Attach as live AND copy it as their starting TARGET — a full current-vs-target card from day one. This is what the pre-Convex code did before it was dropped.",
    "C) Nothing automatic — Plan stays empty until they build one by hand; ship the honest empty state for M1.",
  ],
  answer:
    "B) Attach as live AND copy it as their starting TARGET — a full current-vs-target card from day one. This is what the pre-Convex code did before it was dropped.",
  closedAt: "2026-07-25T12:39:53.054Z",
  context: "txt",
} as const satisfies Question
