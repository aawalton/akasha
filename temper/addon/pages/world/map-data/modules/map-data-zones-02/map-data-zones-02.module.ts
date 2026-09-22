import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataZones02 = {
  id: "01a061e1-aea1-7525-bd41-514e9523bd80",
  type: "page-type/module",
  slug: "map-data-zones-02",
  definition: "part 02 of what each zone holds by way of dungeons, events and subzones",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows the upstream map-data library states at v1.21.",
    },
  ],
} as const satisfies Module
