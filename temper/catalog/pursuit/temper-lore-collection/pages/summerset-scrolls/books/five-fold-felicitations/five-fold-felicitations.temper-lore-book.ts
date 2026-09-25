import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fiveFoldFelicitations = {
  id: "01a0d60a-d5bc-7cb6-90be-82ef81101dff",
  type: "page-type/temper-lore-book",
  slug: "five-fold-felicitations",
  title: "Five-Fold Felicitations!",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4860,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
