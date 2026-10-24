import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudVisibility = {
  id: "01a062ee-f0ce-7072-a02f-7b8f8b50609e",
  type: "page-type/module",
  slug: "characters-task-hud-visibility",
  definition: "which tasks and quests the task HUD shows now, and which of them count as done",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A filler task is shown on a day its due date has not reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filler task counts as done only where its progress reads full.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.518Z",
  updatedAt: "2026-10-24T19:46:51.427Z",
} as const satisfies Module
