import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const soulOfTheSword = {
  id: "01a0d60b-4e03-769b-b5be-9f071339ce83",
  type: "page-type/temper-lore-book",
  slug: "soul-of-the-sword",
  title: "Soul of the Sword",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5710,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
