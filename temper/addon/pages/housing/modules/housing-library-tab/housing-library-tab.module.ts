import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingLibraryTab = {
  id: "01a06128-d5d0-76b8-ae19-d877e4ff3a33",
  type: "page-type/module",
  slug: "housing-library-tab",
  definition: "drawing the community library rows and their port buttons",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is drawn only for a library entry the current filter admits.",
    },
  ],
} as const satisfies Module
