import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sealedLetter = {
  id: "01a0d5f4-07b8-7c08-a0d5-1fbf5c7402c2",
  type: "page-type/temper-lore-book",
  slug: "sealed-letter",
  title: "Sealed Letter",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5704,
  charted: true,
  quest: 6395,
  positions: "jsonl",
} as const satisfies TemperLoreBook
