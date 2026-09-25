import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const abandonedRequisitionRequest = {
  id: "01a0d60e-687e-73d3-9b4e-0f8eef390492",
  type: "page-type/temper-lore-book",
  slug: "abandoned-requisition-request",
  title: "Abandoned Requisition Request",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8638,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
