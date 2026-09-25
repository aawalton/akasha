import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wiseWomansJournalPage = {
  id: "01a0d5f7-aa9a-7098-87b0-d80742a0d529",
  type: "page-type/temper-lore-book",
  slug: "wise-womans-journal-page",
  title: "Wise-woman's Journal Page",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3978,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
