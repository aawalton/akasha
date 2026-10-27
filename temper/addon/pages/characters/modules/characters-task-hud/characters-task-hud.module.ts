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
      statement: "With nothing left to show, the display says so in one line of normal text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every line the display draws is the game's bold face, told apart by color alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The line sits where the first row would, as the display is too narrow to centre it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the HUD layout places the display, it fits the room that layout gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the HUD layout places the display, the display cannot be dragged.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.627Z",
  updatedAt: "2026-10-27T19:34:37.385Z",
} as const satisfies Module
