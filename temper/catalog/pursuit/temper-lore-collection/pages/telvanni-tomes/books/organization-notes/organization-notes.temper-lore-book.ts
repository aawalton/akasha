import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const organizationNotes = {
  id: "01a0d60c-eb9c-70e3-8e97-b1e4afdf6139",
  type: "page-type/temper-lore-book",
  slug: "organization-notes",
  title: "Organization Notes",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7570,
  bookIndex: 73,
  charted: true,
  quest: 7017,
  positions: "jsonl",
} as const satisfies TemperLoreBook
