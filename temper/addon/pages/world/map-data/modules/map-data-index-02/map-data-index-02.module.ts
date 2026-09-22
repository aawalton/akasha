import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataIndex02 = {
  id: "01a061e1-aea5-7f0d-99ff-9f35b4f83d03",
  type: "page-type/module",
  slug: "map-data-index-02",
  definition: "part 02 of what each map index names by texture, zone and subzone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows the upstream map-data library states at v1.21.",
    },
  ],
} as const satisfies Module
