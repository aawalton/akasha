import type { Question } from "../question.page-type.ts"

export const onceYouHavePlacedThePipelineHealthTileDoTheTwoRow = {
  id: "019fe8c1-e7a8-7208-8556-57d407ef4617",
  pageTypeSlug: "question",
  slug: "once-you-have-placed-the-pipeline-health-tile-do-the-two-row",
  ask: "Once you have placed the Pipeline Health tile, do the two rows tell you at a glance what the harness is doing?",
  askedBy: "amy",
  askedIn: "019fae20-f9f8-7b61-b472-6e80f4b805f2",
  status: "answered",
  offered: [
    "Yes — it reads at a glance",
    "It works, but something is missing",
    "Not yet — I will say what is off",
  ],
  answer: "Yes — it reads at a glance",
  closedAt: "2026-08-09T23:01:13.788Z",
  context: "txt",
} as const satisfies Question
