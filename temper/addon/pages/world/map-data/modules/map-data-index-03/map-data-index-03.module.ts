import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataIndex03 = {
  id: "01a061e1-aea6-73c0-9b34-ade691475dca",
  type: "page-type/module",
  slug: "map-data-index-03",
  definition: "part 03 of what each map index names by texture, zone and subzone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows the upstream map-data library states at v1.21.",
    },
  ],
  createdAt: "2026-09-02T11:29:35.398Z",
  updatedAt: "2026-09-22T03:36:30.000Z",
} as const satisfies Module
