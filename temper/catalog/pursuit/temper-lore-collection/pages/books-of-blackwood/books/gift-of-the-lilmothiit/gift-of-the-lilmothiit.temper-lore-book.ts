import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const giftOfTheLilmothiit = {
  id: "01a0d60b-fdb0-722f-9605-73da864c75d6",
  type: "page-type/temper-lore-book",
  slug: "gift-of-the-lilmothiit",
  title: "Gift of the Lilmothiit",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6703,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
