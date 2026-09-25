import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const khafdeedsJournal = {
  id: "01a0d60d-708d-7f9c-ba48-7bc322525147",
  type: "page-type/temper-lore-book",
  slug: "khafdeeds-journal",
  title: "Khafdeed's Journal",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8178,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
