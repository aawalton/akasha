import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const khagsHeadCount = {
  id: "01a0d60e-45b2-7d10-89f2-92be328eed2d",
  type: "page-type/temper-lore-book",
  slug: "khags-head-count",
  title: "Khag's Head Count",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8557,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
