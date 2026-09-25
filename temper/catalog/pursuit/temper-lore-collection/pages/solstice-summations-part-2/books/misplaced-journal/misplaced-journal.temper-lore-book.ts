import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const misplacedJournal = {
  id: "01a0d60e-45b3-758a-9ec0-c37cb09add05",
  type: "page-type/temper-lore-book",
  slug: "misplaced-journal",
  title: "Misplaced Journal",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8599,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
