import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fightAsPrey = {
  id: "01a0d60b-2344-771c-b325-61c638b758ac",
  type: "page-type/temper-lore-book",
  slug: "fight-as-prey",
  title: "Fight As Prey",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5492,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
