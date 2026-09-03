import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type BagSizes = "jsonl"

export const bagSizes = {
  id: "01a0675a-f185-72e7-ad66-35247edba53b",
  pageTypeSlug: "page-property-entry",
  slug: "bag-sizes",
  propertySlug: "bag-sizes",
  definition: "how many slots each bag of each holder has, one bag to a line",
  properties: [
    { pagePropertySlug: "location-id", required: true, many: false },
    { pagePropertySlug: "bag", required: true, many: false },
    { pagePropertySlug: "bag-size", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one bag of one holder.",
    },
    {
      invariantKind: "departure",
      statement: "A holder carrying no bag of a kind has no line for that kind.",
    },
  ],
} as const satisfies PagePropertyEntry
