import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const collectibles = {
  id: "01a06165-ae0e-7002-9050-a3edc1766aec",
  type: "page-type/page-property-entry",
  slug: "collectibles",
  propertySlug: "collectibles",
  definition: "the collectibles a category holds, one collectible to a line",
  properties: [
    { pageProperty: "number-property/eso-collectible-id", required: true, many: false },
    { pageProperty: "text-property/collectible-name", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collectible here is filed by the game under the category with the file.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T09:14:08.782Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies PagePropertyEntry
