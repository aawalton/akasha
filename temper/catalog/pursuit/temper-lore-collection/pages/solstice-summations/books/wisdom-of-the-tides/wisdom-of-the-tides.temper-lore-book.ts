import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wisdomOfTheTides = {
  id: "01a0d60d-ff6a-7436-9bfb-dee5f49bc53d",
  type: "page-type/temper-lore-book",
  slug: "wisdom-of-the-tides",
  title: "Wisdom of the Tides",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8490,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
