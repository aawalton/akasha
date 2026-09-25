import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toJalal = {
  id: "01a0d5f4-3c13-78fc-954a-15978e256902",
  type: "page-type/temper-lore-book",
  slug: "to-jalal",
  title: "To Jalal",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2507,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
