import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archcanonsJournal = {
  id: "01a0d5f7-aa98-773a-a6a0-c303d762d636",
  type: "page-type/temper-lore-book",
  slug: "archcanons-journal",
  title: "Archcanon's Journal",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4434,
  bookIndex: 95,
  charted: true,
  quest: 6003,
  positions: "jsonl",
} as const satisfies TemperLoreBook
