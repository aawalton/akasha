import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const lorePinAlternate = {
  id: "01a0d5da-b5a1-72f0-b11a-97c3bde56dcd",
  type: "page-type/record-property",
  slug: "lore-pin-alternate",
  propertySlug: "alternate",
  definition: "a second place the LoreBooks table tucks inside a place under the key `4`",
  properties: [
    { pageProperty: "boolean-property/lore-pin-fp", required: false, many: false },
    { pageProperty: "number-property/lore-pin-map-id", required: false, many: false },
    { pageProperty: "number-property/lore-pin-map-x", required: false, many: false },
    { pageProperty: "number-property/lore-pin-map-y", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-24T23:57:55.489Z",
  updatedAt: "2026-09-24T23:58:01.000Z",
} as const satisfies RecordProperty
