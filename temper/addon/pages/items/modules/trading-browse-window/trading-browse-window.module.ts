import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingBrowseWindow = {
  id: "01a06160-2a59-7df3-a77c-588f057cc94c",
  type: "page-type/module",
  slug: "trading-browse-window",
  definition: "the window for browsing guild store results",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is built once and refilled rather than rebuilt per search.",
    },
  ],
} as const satisfies Module
