import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingTabs = {
  id: "01a06128-d5d4-7fed-876f-4cd076587467",
  type: "page-type/module",
  slug: "housing-tabs",
  definition: "the four tabs across the top of the housing window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which tab opens first is a player setting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab is Temper's window-controls tab, lit when pointed at and when chosen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chosen tab's title is in the heading part, and the others are muted.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.268Z",
  updatedAt: "2026-09-25T17:19:34.000Z",
} as const satisfies Module
