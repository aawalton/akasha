import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const haldainsJournal = {
  id: "01a0d60d-4aaf-71e3-96cc-f4f8f4487fe2",
  type: "page-type/temper-lore-book",
  slug: "haldains-journal",
  title: "Haldain's Journal",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7823,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
