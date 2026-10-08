import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneGeoData02 = {
  id: "01a061e7-92fa-7256-936b-19fed12a2146",
  type: "page-type/module",
  slug: "zone-geo-data-02",
  definition: "part 02 of which point of interest reaches a zone from its geographical parent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.530Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
