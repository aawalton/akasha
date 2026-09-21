import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneGeoData01 = {
  id: "01a061e7-92f9-7527-bde0-4ff03ef27b8e",
  type: "page-type/module",
  slug: "zone-geo-data-01",
  definition: "part 01 of which point of interest reaches a zone from its geographical parent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
