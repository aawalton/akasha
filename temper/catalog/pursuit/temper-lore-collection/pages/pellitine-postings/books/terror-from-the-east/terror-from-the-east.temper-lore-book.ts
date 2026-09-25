import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const terrorFromTheEast = {
  id: "01a0d60b-4e03-7046-9b0f-de32f66dd896",
  type: "page-type/temper-lore-book",
  slug: "terror-from-the-east",
  title: "Terror from the East",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5715,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
