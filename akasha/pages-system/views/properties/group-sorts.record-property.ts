import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { SortDescending } from "./sort-descending.boolean-property.ts"
import type { SortKey } from "./sort-key.text-property.ts"

export type GroupSort = {
  key: SortKey
  descending: SortDescending
}

export type GroupSorts = List<GroupSort>

export const groupSorts = {
  id: "01a0680d-4d00-7008-a715-4d2b9c8e4109",
  pageTypeSlug: "record-property",
  slug: "group-sorts",
  propertySlug: "group-sorts",
  definition: "the keys a view orders its groups by, each with the way it runs",
  properties: [
    { pagePropertySlug: "sort-key", required: true, many: false },
    { pagePropertySlug: "sort-descending", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a view gathering its pages orders its groups.",
    },
  ],
} as const satisfies RecordProperty
