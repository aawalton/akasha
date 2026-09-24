import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const loreBookMapCounts = {
  id: "01a0d5da-b5a0-70eb-85fd-477dda5232c9",
  type: "page-type/record-property",
  slug: "lore-book-map-counts",
  propertySlug: "map-counts",
  definition: "the maps the LoreBooks table names a book on, with what it gives the book on each",
  properties: [
    { pageProperty: "number-property/lore-pin-map-id", required: true, many: false },
    { pageProperty: "number-property/lore-book-map-count", required: false, many: false },
    { pageProperty: "boolean-property/lore-book-map-flagged", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A map gives a book a count or a mark, and never both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The maps are kept in the order the LoreBooks table lists them.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
