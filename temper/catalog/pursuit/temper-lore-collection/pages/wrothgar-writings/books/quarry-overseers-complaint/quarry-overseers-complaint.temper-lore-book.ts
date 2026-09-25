import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quarryOverseersComplaint = {
  id: "01a0d5f6-d68b-7833-965c-8b42eb0f1872",
  type: "page-type/temper-lore-book",
  slug: "quarry-overseers-complaint",
  title: "Quarry Overseer's Complaint",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2779,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
