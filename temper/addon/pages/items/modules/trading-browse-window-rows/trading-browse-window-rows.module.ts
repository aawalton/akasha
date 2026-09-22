import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingBrowseWindowRows = {
  id: "01a06160-2a59-7146-848b-f736c7465e2d",
  type: "page-type/module",
  slug: "trading-browse-window-rows",
  definition: "the controls a row of the browse window is drawn from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Row heights and widths are fixed numbers rather than measured from content.",
    },
  ],
} as const satisfies Module
