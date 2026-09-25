import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eshrafsJournal = {
  id: "01a0d5f6-a299-794a-90be-c4fadfb830a5",
  type: "page-type/temper-lore-book",
  slug: "eshrafs-journal",
  title: "Eshraf's Journal",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5191,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
