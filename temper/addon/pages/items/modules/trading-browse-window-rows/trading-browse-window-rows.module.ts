import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingBrowseWindowRows = {
  id: "01a06160-2a59-7146-848b-f736c7465e2d",
  type: "page-type/module",
  slug: "trading-browse-window-rows",
  definition: "the controls drawing a row of the browse window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Row heights and widths are fixed numbers rather than measured from content.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row and the header take the heights window-rows gives, with no gap between rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row pointed at is lit as window-rows lights a row.",
    },
  ],
} as const satisfies Module
