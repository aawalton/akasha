import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const singedPage = {
  id: "01a0d5f5-7767-7773-8540-0c37dadfc808",
  type: "page-type/temper-lore-book",
  slug: "singed-page",
  title: "Singed Page",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 330,
  bookIndex: 2,
  charted: true,
  quest: 4071,
  positions: "jsonl",
} as const satisfies TemperLoreBook
