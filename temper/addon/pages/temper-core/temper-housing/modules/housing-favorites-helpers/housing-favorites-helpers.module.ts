import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingFavoritesHelpers = {
  id: "01a06128-d5cc-76f2-8086-9f1e6d3a27b9",
  type: "page-type/module",
  slug: "housing-favorites-helpers",
  definition: "adding, removing and finding a favourite house",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A favourite's place in the saved list is the number a keybind ports to.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.260Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
