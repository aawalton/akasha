import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromKarpuSa = {
  id: "01a0d5f3-0ef7-7a0f-a297-012ee27b0296",
  type: "page-type/temper-lore-book",
  slug: "letter-from-karpu-sa",
  title: "Letter from Karpu-sa",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1567,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
