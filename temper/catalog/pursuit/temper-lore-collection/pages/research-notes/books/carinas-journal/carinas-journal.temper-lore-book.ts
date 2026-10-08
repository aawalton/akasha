import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const carinasJournal = {
  id: "01a0d5f5-1384-7b43-958c-2b808eb40adc",
  type: "page-type/temper-lore-book",
  slug: "carinas-journal",
  title: "Carina's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 139,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:43.460Z",
  updatedAt: "2026-09-25T00:26:45.000Z",
} as const satisfies TemperLoreBook
