import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperHoldingsThing } from "../temper-holdings-things/temper-holdings-thing.page-type.ts"
import type { ChunkCount } from "./properties/chunk-count.number-property.ts"
import type { Stacks } from "./properties/stacks.page-property-entry.ts"

export type TemperInventorySnapshot = TemperHoldingsThing & {
  chunkCount: ChunkCount
  stacks?: Stacks
}

export const temperInventorySnapshot = {
  id: "01a05fcb-fd2d-7480-88fb-8cc035361a6e",
  pageTypeSlug: "page-type",
  slug: "temper-inventory-snapshot",
  definition: "one whole reading of everything an account carries and banks",
  pluralSlug: "temper-inventory-snapshots",
  extendsSlug: "page-type/temper-holdings-thing",
  partSlugs: [
    "boolean-property/bop-tradeable",
    "boolean-property/bound",
    "boolean-property/crafted",
    "boolean-property/is-container",
    "boolean-property/known",
    "boolean-property/locked",
    "boolean-property/quest-relevant",
    "boolean-property/reconstructed",
    "boolean-property/stolen",
    "boolean-property/transmuted",
    "number-property/amount-count",
    "number-property/bag",
    "number-property/chunk-count",
    "number-property/estimated-value",
    "number-property/furniture-category-id",
    "number-property/furniture-subcategory-id",
    "number-property/min-price",
    "number-property/replacement-cost",
    "number-property/sale-amount-count",
    "number-property/sale-avg",
    "number-property/slot",
    "number-property/stack-count",
    "number-property/suggested-price",
    "page-property-entry/stacks",
    "text-property/furniture-category",
    "text-property/item-link",
    "text-property/location-id",
  ],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "captured-at", required: true, many: false },
    { pagePropertySlug: "total-value", required: true, many: false },
    { pagePropertySlug: "chunk-count", required: true, many: false },
    { pagePropertySlug: "stacks", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug opens with `at-` ahead of the moment the reading was taken.",
    },
    {
      invariantKind: "departure",
      statement: "One JSON document is written across every chunk a snapshot counts.",
    },
  ],
} as const satisfies PageType
