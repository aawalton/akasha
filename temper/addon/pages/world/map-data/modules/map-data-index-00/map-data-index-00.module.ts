import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataIndex00 = {
  id: "01a061e1-aea3-78f7-9287-3c987cf5bf24",
  type: "page-type/module",
  slug: "map-data-index-00",
  definition: "part 00 of what each map index names by texture, zone and subzone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows the upstream map-data library states at v1.21.",
    },
  ],
} as const satisfies Module
