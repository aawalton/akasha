import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfUrodilSeaBorn = {
  id: "01a0d5f4-c388-7b7f-90b8-cd29a48e8881",
  type: "page-type/temper-lore-book",
  slug: "journal-of-urodil-sea-born",
  title: "Journal of Urodil Sea-Born",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 449,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
