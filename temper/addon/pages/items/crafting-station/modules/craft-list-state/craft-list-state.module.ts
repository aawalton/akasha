import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftListState = {
  id: "01a0d9f8-89e5-7095-8daa-434e41286c2f",
  type: "page-type/module",
  slug: "craft-list-state",
  definition: "what a crafting window's list shows once its filters leave it nothing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A crafting list whose filters hide every row says so through window-data-state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each list keeps one such state, made the first time its filters run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a list holds is read from the game at once, so it never loads or fails.",
    },
  ],
} as const satisfies Module
