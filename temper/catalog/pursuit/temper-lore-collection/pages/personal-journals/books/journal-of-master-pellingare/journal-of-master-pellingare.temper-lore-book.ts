import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfMasterPellingare = {
  id: "01a0d5f4-6f1a-7152-b7ee-d0359704f6e6",
  type: "page-type/temper-lore-book",
  slug: "journal-of-master-pellingare",
  title: "Journal of Master Pellingare",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1834,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
