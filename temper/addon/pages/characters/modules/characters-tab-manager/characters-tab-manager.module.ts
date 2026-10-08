import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTabManager = {
  id: "01a062ee-f062-706c-82ee-532bd7058883",
  type: "page-type/module",
  slug: "characters-tab-manager",
  definition: "the window's tabs and sub-tabs, which of them is chosen, and the panel each shows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tabs sit on a panel, each a row lit when pointed at and the chosen one lit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab another module adds before the window is built is added once it is built.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.410Z",
  updatedAt: "2026-09-25T17:33:03.000Z",
} as const satisfies Module
