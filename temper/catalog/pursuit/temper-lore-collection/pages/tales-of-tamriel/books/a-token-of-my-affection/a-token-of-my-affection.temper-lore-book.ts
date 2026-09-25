import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aTokenOfMyAffection = {
  id: "01a0d5f5-7766-74b6-a44c-7b459f8e0dd1",
  type: "page-type/temper-lore-book",
  slug: "a-token-of-my-affection",
  title: "A Token of My Affection",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1226,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
