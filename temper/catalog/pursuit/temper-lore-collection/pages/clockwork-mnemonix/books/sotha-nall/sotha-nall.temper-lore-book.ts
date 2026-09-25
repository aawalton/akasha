import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sothaNall = {
  id: "01a0d60a-a214-7104-89c1-a6d995972e1b",
  type: "page-type/temper-lore-book",
  slug: "sotha-nall",
  title: "Sotha Nall",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4801,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
