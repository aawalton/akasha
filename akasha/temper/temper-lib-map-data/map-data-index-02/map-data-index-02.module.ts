import type { Module } from "@akasha/code-system/module"

export const mapDataIndex02 = {
  id: "01a061e1-aea5-7f0d-99ff-9f35b4f83d03",
  pageTypeSlug: "module",
  slug: "map-data-index-02",
  definition: "part 02 of what each map index names by texture, zone and subzone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibMapData v1.21 states.",
    },
  ],
} as const satisfies Module
