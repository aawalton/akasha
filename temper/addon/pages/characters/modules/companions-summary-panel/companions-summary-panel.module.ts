import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsSummaryPanel = {
  id: "01a0611d-84e5-7467-8cd2-0efd143eb949",
  type: "page-type/module",
  slug: "companions-summary-panel",
  definition: "the summary tab's table of one row per companion",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Column positions are fixed numbers rather than measured from content.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.653Z",
  updatedAt: "2026-09-22T14:04:10.000Z",
} as const satisfies Module
