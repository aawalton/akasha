import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingBuildVisitCardsTab = {
  id: "01a06128-d5c5-7488-b800-14b49d097a7e",
  type: "page-type/module",
  slug: "housing-build-visit-cards-tab",
  definition: "building the controls of the visit cards tab",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Controls are built once and hidden rather than made again.",
    },
  ],
} as const satisfies Module
