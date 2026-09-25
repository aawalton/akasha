import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryStatusTooltip = {
  id: "01a06197-4c9b-7dd5-89f9-ff0114a5f0ba",
  type: "page-type/module",
  slug: "sales-history-status-tooltip",
  definition: "the tooltip describing what a category has cached",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Over the status window, the tooltip is Temper's popover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Over the game's guild history, the same lines go in the game's own tooltip.",
    },
  ],
} as const satisfies Module
