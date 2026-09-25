import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forTheDrinkingContest = {
  id: "01a0d5f4-c383-784e-a1b5-52afd76f7561",
  type: "page-type/temper-lore-book",
  slug: "for-the-drinking-contest",
  title: "For the Drinking Contest",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1242,
  bookIndex: 41,
  charted: true,
  quest: 4058,
  positions: "jsonl",
} as const satisfies TemperLoreBook
