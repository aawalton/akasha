import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const shalidorPins = {
  id: "01a0d5da-b5a2-7df6-bea4-f4298e874e9d",
  type: "page-type/page-property-entry",
  slug: "shalidor-pins",
  propertySlug: "shalidor-pins",
  definition: "the places on the maps a Shalidor's Library book may be read, one place to a line",
  properties: [
    { pageProperty: "number-property/lore-pin-map-id", required: true, many: false },
    { pageProperty: "number-property/shalidor-pin-map-order", required: true, many: false },
    { pageProperty: "number-property/lore-pin-map-x", required: true, many: false },
    { pageProperty: "number-property/lore-pin-map-y", required: true, many: false },
    { pageProperty: "number-property/eso-zone-id", required: false, many: false },
    { pageProperty: "number-property/shalidor-pin-6", required: false, many: false },
    { pageProperty: "number-property/shalidor-pin-world-y", required: false, many: false },
    {
      pageProperty: "number-property/shalidor-pin-location-details",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The LoreBooks add-on lists these pins by map rather than by book.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
