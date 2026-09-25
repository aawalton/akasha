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
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter group moves to a new row where the screen has no room left for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window shows as many result rows as fit the screen, up to fifty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The header and the result rows sit on one panel.",
    },
  ],
} as const satisfies Module
