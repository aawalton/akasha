import type { List } from "../../page-types/page-properties/page-property.page-type.ts"
import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { NarrowComparison } from "./narrow-comparison.text-property.ts"
import type { NarrowKey } from "./narrow-key.text-property.ts"
import type { NarrowValues } from "./narrow-values.text-property.ts"

export type Narrow = {
  key: NarrowKey
  comparison: NarrowComparison
  values: NarrowValues
}

export type Narrows = List<Narrow>

export const narrows = {
  id: "01a063ee-2a3b-732c-983b-68ef37a472f5",
  pageTypeSlug: "record-property",
  slug: "narrows",
  propertySlug: "narrows",
  definition: "what a query tests a page against, each with the key tested and how",
  properties: [
    { pagePropertySlug: "narrow-key", required: true, many: false },
    { pagePropertySlug: "narrow-comparison", required: true, many: false },
    { pagePropertySlug: "narrow-values", required: true, many: true, max: 20 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is answered where the page passes every narrow.",
    },
    {
      invariantKind: "departure",
      statement: "A query stating no narrow asks of every page of its type.",
    },
    {
      invariantKind: "departure",
      statement: "Two narrows on one key are two entries.",
    },
    {
      invariantKind: "departure",
      statement: "A narrow a query cannot read is refused rather than dropped.",
    },
  ],
} as const satisfies RecordProperty
