import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const bonuses = {
  id: "01a05fd1-d437-730d-b6e2-e46b2bc06210",
  type: "page-type/page-property-entry",
  slug: "bonuses",
  propertySlug: "bonuses",
  definition: "what a set gives at each piece count, one count to a line",
  properties: [
    { pageProperty: "number-property/bonus-count", required: true, many: false },
    { pageProperty: "text-property/bonus-status", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    {
      pageProperty: "record-property/bonus-effects",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:53:02.007Z",
  updatedAt: "2026-09-21T15:28:58.000Z",
} as const satisfies PagePropertyEntry
