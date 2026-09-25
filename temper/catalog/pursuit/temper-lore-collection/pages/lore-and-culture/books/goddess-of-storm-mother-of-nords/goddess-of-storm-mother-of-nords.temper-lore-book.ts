import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goddessOfStormMotherOfNords = {
  id: "01a0d5f3-3fda-7189-8e94-924a3e5c69c6",
  type: "page-type/temper-lore-book",
  slug: "goddess-of-storm-mother-of-nords",
  title: "Goddess of Storm, Mother of Nords",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 377,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
