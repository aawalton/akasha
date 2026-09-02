import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { SequenceDirection } from "./sequence-direction.text-property.ts"
import type { SequenceGroupBy } from "./sequence-group-by.text-property.ts"
import type { SequenceOrderBy } from "./sequence-order-by.text-property.ts"

export type Sequence = {
  groupBy: SequenceGroupBy
  orderBy: SequenceOrderBy
  direction?: SequenceDirection
}

export const sequence = {
  id: "01a062de-2001-7000-bc0f-0dd4d369ec1b",
  pageTypeSlug: "record-property",
  slug: "sequence",
  propertySlug: "sequence",
  definition: "how a page type's pages are grouped and ordered when one is read after another",
  properties: [
    { pagePropertySlug: "sequence-group-by", required: true, many: false },
    { pagePropertySlug: "sequence-order-by", required: true, many: false },
    { pagePropertySlug: "sequence-direction", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type states here how its pages are grouped and ordered into a run.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating none takes what the page type above states.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with none above it and none of its own stands in no run.",
    },
    {
      invariantKind: "departure",
      statement: "Pages holding one value under the grouping key stand in one run.",
    },
  ],
} as const satisfies RecordProperty
