import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lettersFromTheWarMournhold = {
  id: "01a0d5f6-a29a-7164-a16c-61699941983d",
  type: "page-type/temper-lore-book",
  slug: "letters-from-the-war-mournhold",
  title: "Letters from the War: Mournhold",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2847,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
