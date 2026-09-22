import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasurePinsData = {
  id: "01a061d5-d0bd-7727-b9ce-b4477741a289",
  type: "page-type/module",
  slug: "treasure-pins-data",
  definition: "every map's pins joined from their parts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is one treasure-map pin the collections add-on draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are kept in numbered parts rather than in one file.",
    },
  ],
} as const satisfies Module
