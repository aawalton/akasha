import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperHoldingsThing } from "../temper-holdings-things/temper-holdings-thing.page-type.ts"
import type { ChunkCount } from "./properties/chunk-count.number-property.ts"

export type TemperInventorySnapshot = TemperHoldingsThing & {
  chunkCount: ChunkCount
}

export const temperInventorySnapshot = {
  id: "01a05fcb-fd2d-7480-88fb-8cc035361a6e",
  pageTypeSlug: "page-type",
  slug: "temper-inventory-snapshot",
  definition: "one whole reading of everything an account carries and banks",
  pluralSlug: "temper-inventory-snapshots",
  extendsSlug: "page-type/temper-holdings-thing",
  partSlugs: ["number-property/chunk-count"],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "captured-at", required: true, many: false },
    { pagePropertySlug: "total-value", required: true, many: false },
    { pagePropertySlug: "chunk-count", required: true, many: false },
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
