import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodSoakedLetter = {
  id: "01a0d5f7-aa98-7b50-be8d-7e10ec9e3b8d",
  type: "page-type/temper-lore-book",
  slug: "blood-soaked-letter",
  title: "Blood-Soaked Letter",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4100,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
