import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theShatteringSword = {
  id: "01a0d60a-f1ed-7144-8052-e9db599543f9",
  type: "page-type/temper-lore-book",
  slug: "the-shattering-sword",
  title: "The Shattering Sword",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4834,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
