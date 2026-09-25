import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rhanbiqsNotes = {
  id: "01a0d5f7-4294-78b8-9f04-1f8b8bf91249",
  type: "page-type/temper-lore-book",
  slug: "rhanbiqs-notes",
  title: "Rhanbiq's Notes",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3239,
  bookIndex: 75,
  charted: true,
  quest: 5553,
  positions: "jsonl",
} as const satisfies TemperLoreBook
