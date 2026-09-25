import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sacredWatersOfTheShiningSea = {
  id: "01a0d60b-4e03-7131-8365-604b0af1fc28",
  type: "page-type/temper-lore-book",
  slug: "sacred-waters-of-the-shining-sea",
  title: "Sacred Waters of the Shining Sea",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5810,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
