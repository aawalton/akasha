import type { Module } from "@akasha/code-system/module"

export const zoneGeoData02 = {
  id: "01a061e7-92fa-7256-936b-19fed12a2146",
  pageTypeSlug: "module",
  slug: "zone-geo-data-02",
  definition: "part 02 of which point of interest reaches a zone from its geographical parent",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
