import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quarryWorkOrder = {
  id: "01a0d5f6-d68b-7b76-bd4e-99b6202ffe0f",
  type: "page-type/temper-lore-book",
  slug: "quarry-work-order",
  title: "Quarry Work Order",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2778,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
