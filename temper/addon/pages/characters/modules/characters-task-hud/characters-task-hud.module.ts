import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHud = {
  id: "01a062ee-f13b-7078-8d2b-e3b2c0499a1f",
  type: "page-type/module",
  slug: "characters-task-hud",
  definition: "the heads-up display of what is left to do, built once and redrawn on every change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "With nothing left to show, the display says so in one shadowed muted line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The line sits where the first row would, as the display is too narrow to centre it.",
    },
  ],
} as const satisfies Module
