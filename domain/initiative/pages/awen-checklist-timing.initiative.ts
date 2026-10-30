import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenChecklistTiming = {
  id: "01a18cb3-e514-70b9-a785-d09ef43a09ae",
  type: "page-type/initiative",
  slug: "awen-checklist-timing",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  intentStack: [
    {
      statement: "Each step of a one-seat turn is timed into its story's phase timings.",
    },
    {
      statement:
        "`akasha measure story` shows a one-seat turn's steps beside a seat-graph turn's phases.",
    },
  ],
  constraints: ["A seat-graph turn's phase rows are written and drawn as they are now."],
  createdAt: "2026-10-30T12:06:02.259Z",
  updatedAt: "2026-10-30T12:06:02.259Z",
} as const satisfies Initiative
