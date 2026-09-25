import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourCurseAndOurGlory = {
  id: "01a0d5f5-abba-7e70-a0b0-86f674e236b0",
  type: "page-type/temper-lore-book",
  slug: "our-curse-and-our-glory",
  title: "Our Curse and Our Glory",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1852,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
