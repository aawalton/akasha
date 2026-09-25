import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mojhaIsAFool = {
  id: "01a0d60b-2345-7701-b546-657400d4fe13",
  type: "page-type/temper-lore-book",
  slug: "mojha-is-a-fool",
  title: "Mojha is a Fool",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5451,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
