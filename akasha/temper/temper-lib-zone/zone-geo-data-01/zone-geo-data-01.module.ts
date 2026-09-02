import type { Module } from "@akasha/code-system/module"

export const zoneGeoData01 = {
  id: "01a061e7-92f9-7527-bde0-4ff03ef27b8e",
  pageTypeSlug: "module",
  slug: "zone-geo-data-01",
  definition: "part 01 of which point of interest reaches a zone from its geographical parent",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
