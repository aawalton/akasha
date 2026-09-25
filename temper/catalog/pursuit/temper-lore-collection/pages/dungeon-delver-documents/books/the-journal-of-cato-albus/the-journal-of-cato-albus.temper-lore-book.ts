import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theJournalOfCatoAlbus = {
  id: "01a0d60d-708e-76d4-a5d2-5577bf6c3923",
  type: "page-type/temper-lore-book",
  slug: "the-journal-of-cato-albus",
  title: "The Journal of Cato Albus",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8173,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
