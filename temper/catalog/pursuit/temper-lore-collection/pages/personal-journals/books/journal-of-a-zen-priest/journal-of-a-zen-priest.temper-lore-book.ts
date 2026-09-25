import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfAZenPriest = {
  id: "01a0d5f4-6f1a-7732-a504-9c53f5242f98",
  type: "page-type/temper-lore-book",
  slug: "journal-of-a-zen-priest",
  title: "Journal of a Z'en Priest",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 394,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
