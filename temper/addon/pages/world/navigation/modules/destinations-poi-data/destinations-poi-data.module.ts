import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsPoiData = {
  id: "01a06269-29d5-74ec-bf81-bd99d40f7eec",
  type: "page-type/module",
  slug: "destinations-poi-data",
  definition:
    "the keeps, the points of interest by zone and the dungeon item sets, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
} as const satisfies Module
