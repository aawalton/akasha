import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const groundskeepersLetter = {
  id: "01a0d5f6-f385-7005-8bb5-9ee7f58004c8",
  type: "page-type/temper-lore-book",
  slug: "groundskeepers-letter",
  title: "Groundskeeper's Letter",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 3146,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
