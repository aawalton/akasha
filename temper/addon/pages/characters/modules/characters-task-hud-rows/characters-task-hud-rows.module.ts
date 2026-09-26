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
  ],
} as const satisfies Module
