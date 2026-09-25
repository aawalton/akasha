import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCouncilorDolvara = {
  id: "01a0d5f7-aa99-7e51-b503-087b5e932d80",
  type: "page-type/temper-lore-book",
  slug: "letter-to-councilor-dolvara",
  title: "Letter to Councilor Dolvara",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4111,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
