import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legendOfVeyond = {
  id: "01a0d60b-fdb0-7bc8-a299-888b508abd47",
  type: "page-type/temper-lore-book",
  slug: "legend-of-veyond",
  title: "Legend of Veyond",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6725,
  charted: true,
  onBookshelves: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
