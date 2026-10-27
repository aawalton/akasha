import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskHudFit = {
  id: "01a17ea0-3f67-7f74-9028-5bf8c48059c5",
  type: "page-type/module",
  slug: "characters-task-hud-fit",
  definition:
    "which rows the task display folds, shortens or leaves out so it ends above the screen's bottom",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A display that fits already is drawn as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows are folded from the last row up until the display fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The row where the display runs out shows as many of its own rows as fit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows under a row are fitted by the same rule as the tasks are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows left out under a row are counted in one line where they would have been.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task Alan opened by clicking it is never folded, though it may be shortened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where folding falls short, the last rows are left out, leaving room for a line counting them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The display never scrolls.",
    },
  ],
  createdAt: "2026-10-27T18:29:53.639Z",
  updatedAt: "2026-10-27T18:41:18.959Z",
} as const satisfies Module
