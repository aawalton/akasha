import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsSummaryPanel = {
  id: "01a0611d-84e5-7467-8cd2-0efd143eb949",
  type: "page-type/module",
  slug: "companions-summary-panel",
  definition: "the table of one row per companion the summary tab is drawn from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Column positions are fixed numbers rather than measured from content.",
    },
  ],
} as const satisfies Module
