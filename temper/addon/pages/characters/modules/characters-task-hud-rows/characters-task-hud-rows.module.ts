import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudRows = {
  id: "01a062ee-f128-7077-9396-8431051e6c14",
  type: "page-type/module",
  slug: "characters-task-hud-rows",
  definition: "the controls a row of the task HUD is drawn from, for a task, a quest or a hint",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every row is one row tall, and a hint that wraps grows by the lines it adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hint's count is drawn at the right edge, where every row's count is.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.608Z",
  updatedAt: "2026-09-26T13:58:59.000Z",
} as const satisfies Module
