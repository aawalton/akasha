import type { List } from "../../page-types/page-properties/page-property.page-type.ts"
import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { HeaderFields } from "./header-fields.text-property.ts"
import type { HeaderShowCover } from "./header-show-cover.boolean-property.ts"

export type CollectionHeader = {
  showCover?: HeaderShowCover
  fields: List<HeaderFields>
}

export const collectionHeader = {
  id: "01a0683a-620a-7fa0-b6b2-c73fafd745f0",
  pageTypeSlug: "record-property",
  slug: "collection-header",
  propertySlug: "header",
  definition: "what stands above the pages a page gathers",
  properties: [
    { pagePropertySlug: "header-show-cover", required: false, many: false },
    { pagePropertySlug: "header-fields", required: true, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A header naming no keys stands as the page's own name alone.",
    },
  ],
} as const satisfies RecordProperty
