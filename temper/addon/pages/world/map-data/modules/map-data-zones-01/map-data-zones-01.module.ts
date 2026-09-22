import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataZones01 = {
  id: "01a061e1-aea0-7d0b-97a2-70fd0d69c27c",
  type: "page-type/module",
  slug: "map-data-zones-01",
  definition: "part 01 of what each zone holds by way of dungeons, events and subzones",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows the upstream map-data library states at v1.21.",
    },
  ],
} as const satisfies Module
