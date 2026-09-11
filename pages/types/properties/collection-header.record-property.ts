import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const collectionHeader = {
  id: "01a0683a-620a-7fa0-b6b2-c73fafd745f0",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "collection-header",
  propertySlug: "header",
  definition: "what stands above the pages a page gathers",
  properties: [
    { pageProperty: "boolean-property/header-show-cover", required: false, many: false },
    { pageProperty: "text-property/header-fields", required: true, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A header naming no keys stands as the page's own name alone.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
