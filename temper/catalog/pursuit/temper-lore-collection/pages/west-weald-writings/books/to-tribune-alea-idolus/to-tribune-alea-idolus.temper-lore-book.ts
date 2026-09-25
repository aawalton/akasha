import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toTribuneAleaIdolus = {
  id: "01a0d60d-4ab0-7151-8d89-e8ee9c5f0f85",
  type: "page-type/temper-lore-book",
  slug: "to-tribune-alea-idolus",
  title: "To Tribune Alea Idolus",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7999,
  bookIndex: 39,
  charted: true,
  quest: 7083,
  positions: "jsonl",
} as const satisfies TemperLoreBook
