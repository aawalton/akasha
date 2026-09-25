import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfMagiulShiana = {
  id: "01a0d5f4-6f1a-7e5d-83f8-da3f895901d4",
  type: "page-type/temper-lore-book",
  slug: "journal-of-magiul-shiana",
  title: "Journal of Magiul Shiana",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 967,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
