import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legionarysJournal = {
  id: "01a0d5f3-7053-751e-9c7a-fbe740d69d78",
  type: "page-type/temper-lore-book",
  slug: "legionarys-journal",
  title: "Legionary's Journal",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 939,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:24:56.147Z",
  updatedAt: "2026-09-25T00:24:58.000Z",
} as const satisfies TemperLoreBook
