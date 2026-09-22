import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useRecordPageView = {
  id: "01a05cb4-fefb-7e34-b75b-0f9b37eda5e4",
  type: "page-type/module",
  slug: "use-record-page-view",
  definition: "recording a reader opening a page no more often than staleness allows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type carrying no mark for the last view has no view recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a page type carries is read from the properties that page type declares.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page type is named here by its slug.",
    },
  ],
} as const satisfies Module
