import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingBuildCasts = {
  id: "01a06113-b7cd-713c-9e44-bec20c408d8d",
  type: "page-type/module",
  slug: "housing-build-casts",
  definition: "the control shapes the housing window builders name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A cast is how the ported add-on reaches a control the game types loosely.",
    },
  ],
} as const satisfies Module
