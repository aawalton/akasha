import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingBrowseEngine = {
  id: "01a06160-2a59-7c89-b1b4-4a07fc4e70d1",
  type: "page-type/module",
  slug: "trading-browse-engine",
  definition: "running a guild store search and holding the results a player is browsing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Results are held as read rather than sorted on arrival.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller is told after every step of a search, so a window shows where it is.",
    },
  ],
} as const satisfies Module
