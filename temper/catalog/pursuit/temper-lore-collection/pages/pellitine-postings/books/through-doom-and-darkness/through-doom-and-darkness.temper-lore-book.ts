import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const throughDoomAndDarkness = {
  id: "01a0d60b-4e03-7684-b8d8-18242db9d70b",
  type: "page-type/temper-lore-book",
  slug: "through-doom-and-darkness",
  title: "Through Doom and Darkness",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5731,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
