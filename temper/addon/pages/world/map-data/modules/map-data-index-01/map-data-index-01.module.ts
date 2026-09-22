import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataIndex01 = {
  id: "01a061e1-aea4-70e1-ab44-4d4e180e9d8e",
  type: "page-type/module",
  slug: "map-data-index-01",
  definition: "part 01 of what each map index names by texture, zone and subzone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows the upstream map-data library states at v1.21.",
    },
  ],
} as const satisfies Module
