import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ancientNordTablet = {
  id: "01a0d5f6-d68a-71c8-a3c4-dc8049056ece",
  type: "page-type/temper-lore-book",
  slug: "ancient-nord-tablet",
  title: "Ancient Nord Tablet",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3019,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
