import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const recruitingARanger = {
  id: "01a0d5f1-f451-74e0-be30-ea4f8992c130",
  type: "page-type/temper-lore-book",
  slug: "recruiting-a-ranger",
  title: "Recruiting a Ranger",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1556,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
