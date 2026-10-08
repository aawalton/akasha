import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aniastesJournal = {
  id: "01a0d5f4-c382-711c-bd32-d1bc96435807",
  type: "page-type/temper-lore-book",
  slug: "aniastes-journal",
  title: "Aniaste's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 507,
  bookIndex: 8,
  charted: true,
  quest: 4229,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:22.978Z",
  updatedAt: "2026-09-25T00:26:33.000Z",
} as const satisfies TemperLoreBook
