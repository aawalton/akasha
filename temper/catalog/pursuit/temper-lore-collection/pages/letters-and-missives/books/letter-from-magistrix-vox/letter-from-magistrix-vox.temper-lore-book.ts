import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromMagistrixVox = {
  id: "01a0d5f3-0ef7-7da9-b6f4-1f3f8c5d0dc0",
  type: "page-type/temper-lore-book",
  slug: "letter-from-magistrix-vox",
  title: "Letter from Magistrix Vox",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2496,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
