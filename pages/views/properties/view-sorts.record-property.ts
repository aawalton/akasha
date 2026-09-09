import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "@akasha/pages/record-property"
import type { SortDescending } from "./sort-descending.boolean-property.ts"
import type { SortKey } from "./sort-key.text-property.ts"

export type ViewSort = {
  key: SortKey
  descending: SortDescending
}

export type ViewSorts = List<ViewSort>

export const viewSorts = {
  id: "01a0680d-4d00-7004-a139-6e5c8b2f4105",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "view-sorts",
  propertySlug: "view-sorts",
  definition: "the keys a view orders its pages by, each with the way it runs",
  properties: [
    { pageProperty: "text-property/sort-key", required: true, many: false },
    { pageProperty: "boolean-property/sort-descending", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keys are weighed in the order the keys are stated.",
    },
    {
      invariantKind: "departure",
      statement: "A view stating no key draws in whatever order the pages arrive.",
    },
  ],
} as const satisfies RecordProperty
