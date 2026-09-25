import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ilessanTower = {
  id: "01a0d5f1-f451-7105-aff6-8e6ae92b5f80",
  type: "page-type/temper-lore-book",
  slug: "ilessan-tower",
  title: "Ilessan Tower",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1202,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
