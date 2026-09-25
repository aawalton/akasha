import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dwemerDreams = {
  id: "01a0d5f5-7766-786e-bd40-73708d26d4b2",
  type: "page-type/temper-lore-book",
  slug: "dwemer-dreams",
  title: "Dwemer Dreams",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 547,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
