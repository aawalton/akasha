import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const viewTabContent = {
  id: "01a06259-518e-7c69-81c7-ad0fa6c5847a",
  type: "page-type/module",
  slug: "view-tab-content",
  definition: "the rows a tab of a view holds, laid out the way the tab names",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab's rows are named as a listing of their page type is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab drawn beneath a page lists the rows that page narrows its view to.",
    },
  ],
  createdAt: "2026-09-02T13:40:15.886Z",
  updatedAt: "2026-09-28T20:50:55.000Z",
} as const satisfies Module
