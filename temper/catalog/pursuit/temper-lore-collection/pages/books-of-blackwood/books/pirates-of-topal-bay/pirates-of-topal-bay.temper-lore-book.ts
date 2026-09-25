import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const piratesOfTopalBay = {
  id: "01a0d60b-fdb0-719c-a072-b45b80c9e749",
  type: "page-type/temper-lore-book",
  slug: "pirates-of-topal-bay",
  title: "Pirates of Topal Bay",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6675,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
