import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const collectionHeader = {
  id: "01a0683a-620a-7fa0-b6b2-c73fafd745f0",
  type: "page-type/record-property",
  slug: "collection-header",
  propertySlug: "header",
  definition: "what stands above the pages a page gathers",
  properties: [
    { pageProperty: "boolean-property/header-show-cover", required: false, many: false },
    { pageProperty: "text-property/header-fields", required: true, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A header naming no keys stands as the page's own name alone.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:04:11.786Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RecordProperty
