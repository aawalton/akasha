import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudState = {
  id: "01a062ee-f028-7069-9bf4-0162a138b3ea",
  type: "page-type/module",
  slug: "characters-task-hud-state",
  definition: "everything the task HUD has while the game runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A done line is the game's succeeded color, and an urgent one its failed color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Gold is the game's contrast color, and blue and purple its magic and arcane ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every redraw of the display is counted, with the moment it began.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each redraw notes whether it returned early, drew the empty line or drew every row.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.352Z",
  updatedAt: "2026-10-18T17:39:47.514Z",
} as const satisfies Module
