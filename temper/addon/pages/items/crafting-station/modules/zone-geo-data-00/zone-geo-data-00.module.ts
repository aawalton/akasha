import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneGeoData00 = {
  id: "01a061e7-92f8-798e-bba4-986bf682dc1e",
  type: "page-type/module",
  slug: "zone-geo-data-00",
  definition: "part 00 of which point of interest reaches a zone from its geographical parent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.528Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
