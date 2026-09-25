import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromTheSkaldKingsAgent = {
  id: "01a0d60b-8108-7fe7-b731-22562fe275c3",
  type: "page-type/temper-lore-book",
  slug: "letter-from-the-skald-kings-agent",
  title: "Letter from the Skald-King's Agent",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6216,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
