import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nobilityInTheft = {
  id: "01a0d5f1-f451-73f6-82ec-f4c321d26a6e",
  type: "page-type/temper-lore-book",
  slug: "nobility-in-theft",
  title: "Nobility in Theft",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2111,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
