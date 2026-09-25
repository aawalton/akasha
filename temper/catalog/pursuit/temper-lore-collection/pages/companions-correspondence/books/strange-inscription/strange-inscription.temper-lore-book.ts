import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const strangeInscription = {
  id: "01a0d60d-bbe4-71b8-a231-03a8d05491ca",
  type: "page-type/temper-lore-book",
  slug: "strange-inscription",
  title: "Strange Inscription",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8324,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
