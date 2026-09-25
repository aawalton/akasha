import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMabrigashTrial = {
  id: "01a0d5f5-7767-7eb7-ac79-88e486aca7b6",
  type: "page-type/temper-lore-book",
  slug: "the-mabrigash-trial",
  title: "The Mabrigash Trial",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 613,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
