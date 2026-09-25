import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAgnenor = {
  id: "01a0d5f3-0ef7-77aa-ad11-effadf342631",
  type: "page-type/temper-lore-book",
  slug: "letter-from-agnenor",
  title: "Letter from Agnenor",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 490,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
