import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dwarfLight = {
  id: "01a0d5f6-d68a-714a-b80a-697c85637b1a",
  type: "page-type/temper-lore-book",
  slug: "dwarf-light",
  title: "Dwarf Light",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3117,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
