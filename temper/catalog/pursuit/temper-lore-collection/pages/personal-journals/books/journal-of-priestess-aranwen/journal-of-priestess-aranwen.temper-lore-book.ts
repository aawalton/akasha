import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfPriestessAranwen = {
  id: "01a0d5f4-6f1a-729f-a191-e9dfa3c61934",
  type: "page-type/temper-lore-book",
  slug: "journal-of-priestess-aranwen",
  title: "Journal of Priestess Aranwen",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 530,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
