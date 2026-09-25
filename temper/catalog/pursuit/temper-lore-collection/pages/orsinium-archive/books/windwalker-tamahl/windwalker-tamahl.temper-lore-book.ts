import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const windwalkerTamahl = {
  id: "01a0d5f7-160c-7579-a944-504682693e67",
  type: "page-type/temper-lore-book",
  slug: "windwalker-tamahl",
  title: "Windwalker Tamahl",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3138,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
