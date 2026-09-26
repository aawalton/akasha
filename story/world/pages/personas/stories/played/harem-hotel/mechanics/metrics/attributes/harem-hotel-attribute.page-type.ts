import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelAttribute = {
  id: "01a0de49-ed43-7ed7-ad11-08dd171d2d14",
  type: "page-type/page-type",
  slug: "harem-hotel-attribute",
  definition: "a number for a persistent property of a character in the Harem Hotel",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character-attribute"],
  parts: [
    "page-type/harem-hotel-finesse",
    "page-type/harem-hotel-intellect",
    "page-type/harem-hotel-luck",
    "page-type/harem-hotel-might",
    "page-type/harem-hotel-perception",
    "page-type/harem-hotel-presence",
    "page-type/harem-hotel-vitality",
    "page-type/harem-hotel-will",
  ],
  properties: [
    { pageProperty: "number-property/metric-min-value", required: true, many: false, fixed: "3" },
    { pageProperty: "number-property/metric-max-value", required: true, many: false, fixed: "18" },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
