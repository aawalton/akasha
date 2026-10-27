import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudFit = {
  id: "01a17ea0-3f67-7f74-9028-5bf8c48059c5",
  type: "page-type/module",
  slug: "characters-task-hud-fit",
  definition:
    "which tasks the task display folds or leaves out so it ends above the screen's bottom",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A display that fits already is drawn as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tasks are folded from the last task up until the display fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task Alan opened by clicking it is never folded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where folding falls short, the last tasks are left out, leaving room for a line counting them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The display never scrolls.",
    },
  ],
  createdAt: "2026-10-27T18:29:53.639Z",
  updatedAt: "2026-10-27T18:29:53.639Z",
} as const satisfies Module
