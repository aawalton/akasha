import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guildMagesJournal = {
  id: "01a0d5f6-45ad-7fa2-a498-441196599418",
  type: "page-type/temper-lore-book",
  slug: "guild-mages-journal",
  title: "Guild Mage's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1562,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:01.837Z",
  updatedAt: "2026-09-25T00:28:03.000Z",
} as const satisfies TemperLoreBook
