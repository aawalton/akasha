import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watchingQueue = {
  id: "01a15002-1d5e-7b64-80b0-358ca1adf304",
  type: "page-type/module",
  slug: "watching-queue",
  definition: "the courses left to watch a lecture of today, in the order the view shows them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The queue is the unfinished courses view, narrowed and sorted as that view says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow is tested as the page service tests a narrow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day named in a narrow is the ESO day, starting at the ESO reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is left out of the queue where no link to the site is held for it.",
    },
  ],
  createdAt: "2026-10-18T17:14:38.301Z",
  updatedAt: "2026-10-18T17:14:38.301Z",
} as const satisfies Module
