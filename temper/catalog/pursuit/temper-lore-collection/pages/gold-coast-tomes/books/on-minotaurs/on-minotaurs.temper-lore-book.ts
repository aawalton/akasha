import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onMinotaurs = {
  id: "01a0d5f7-73fa-7096-ba69-33d616ea6514",
  type: "page-type/temper-lore-book",
  slug: "on-minotaurs",
  title: "On Minotaurs",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3254,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
