import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legendOfThaneIcehammer = {
  id: "01a0d5f5-7766-7503-b3cb-209b79eacdce",
  type: "page-type/temper-lore-book",
  slug: "legend-of-thane-icehammer",
  title: "Legend of Thane Icehammer",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 486,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
