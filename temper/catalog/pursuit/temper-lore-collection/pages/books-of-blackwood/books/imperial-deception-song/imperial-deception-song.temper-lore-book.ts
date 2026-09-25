import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperialDeceptionSong = {
  id: "01a0d60b-fdb0-71c1-ab2f-4803512c9263",
  type: "page-type/temper-lore-book",
  slug: "imperial-deception-song",
  title: "Imperial Deception Song",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6599,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
