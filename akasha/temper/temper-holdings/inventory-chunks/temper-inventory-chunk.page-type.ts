import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperThing } from "../../temper-thing.page-type.ts"
import type { ChunkIndex } from "./properties/chunk-index.number-property.ts"
import type { Data } from "./properties/data.file-property.ts"
import type { Inventory } from "./properties/inventory.relation-property.ts"

export type TemperInventoryChunk = TemperThing & {
  chunkIndex: ChunkIndex
  inventory: Inventory
  data: Data
}

export const temperInventoryChunk = {
  id: "01a05fcb-fd2f-718b-84ca-d9cdeb890706",
  pageTypeSlug: "page-type",
  slug: "temper-inventory-chunk",
  definition: "one slice of the JSON a reading of an inventory was written as",
  pluralSlug: "temper-inventory-chunks",
  extendsSlug: "page-type/temper-thing",
  partSlugs: ["file-property/data", "number-property/chunk-index", "relation-property/inventory"],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "inventory", required: true, many: false },
    { pagePropertySlug: "chunk-index", required: true, many: false },
    { pagePropertySlug: "data", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug opens with `at-` ahead of the moment the reading was taken.",
    },
    {
      invariantKind: "departure",
      statement: "The slices of one reading rejoin in the order the chunk indexes give.",
    },
  ],
} as const satisfies PageType
