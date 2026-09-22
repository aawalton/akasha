import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDetailProperties = {
  id: "01a06257-46ed-7cf6-b31e-9adb50ca83bc",
  type: "page-type/module",
  slug: "page-detail-properties",
  definition: "the property rows shown down the side of one page",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are drawn in the order their titles read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order a page type declares its properties in is not read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No row here is dragged into an order of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row nobody may edit is left out where its value is empty.",
    },
  ],
} as const satisfies Module
