import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingSearch = {
  id: "01a06128-d5d1-76dc-adcd-583afb6e89d6",
  type: "page-type/module",
  slug: "housing-search",
  definition: "matching what a player types against the names the add-on has seen",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Matching begins once the typed text is long enough.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The number of results shown at once is capped.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.265Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
