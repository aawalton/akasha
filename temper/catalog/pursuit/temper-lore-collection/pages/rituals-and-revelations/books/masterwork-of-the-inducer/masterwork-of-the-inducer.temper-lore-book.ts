import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masterworkOfTheInducer = {
  id: "01a0d5f5-444b-7a12-b58c-aa63fa69dfa2",
  type: "page-type/temper-lore-book",
  slug: "masterwork-of-the-inducer",
  title: "Masterwork of the Inducer",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1448,
  bookIndex: 53,
  charted: true,
  quest: 4667,
  positions: "jsonl",
} as const satisfies TemperLoreBook
