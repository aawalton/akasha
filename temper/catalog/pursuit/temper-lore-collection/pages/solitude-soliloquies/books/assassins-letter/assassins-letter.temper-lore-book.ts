import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const assassinsLetter = {
  id: "01a0d60b-8107-71cc-bcf0-5ee54fcf8309",
  type: "page-type/temper-lore-book",
  slug: "assassins-letter",
  title: "Assassin's Letter",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6112,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
