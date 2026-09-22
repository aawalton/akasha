import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataZones00 = {
  id: "01a061e1-ae9e-7f12-a54d-11401f2af874",
  type: "page-type/module",
  slug: "map-data-zones-00",
  definition: "part 00 of what each zone holds by way of dungeons, events and subzones",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows the upstream map-data library states at v1.21.",
    },
  ],
} as const satisfies Module
