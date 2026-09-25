import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfBernamotTheGreat = {
  id: "01a0d5f4-6f1a-7164-87f9-c0174289e614",
  type: "page-type/temper-lore-book",
  slug: "journal-of-bernamot-the-great",
  title: "Journal of Bernamot the Great",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2036,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
