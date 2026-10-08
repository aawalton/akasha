import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const menderRoslennsJournal = {
  id: "01a0d60c-75b5-7b9c-a8bc-9b9c1432688f",
  type: "page-type/temper-lore-book",
  slug: "mender-roslenns-journal",
  title: "Mender Roslenn's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7025,
  charted: true,
  quest: 6772,
  positions: "jsonl",
  createdAt: "2026-09-25T00:52:15.925Z",
  updatedAt: "2026-09-25T00:52:18.000Z",
} as const satisfies TemperLoreBook
