import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arakaulTheUnbroken = {
  id: "01a0d5f7-160b-7bc0-b62b-ba69de3171f0",
  type: "page-type/temper-lore-book",
  slug: "arakaul-the-unbroken",
  title: "Arakaul the Unbroken",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3137,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
