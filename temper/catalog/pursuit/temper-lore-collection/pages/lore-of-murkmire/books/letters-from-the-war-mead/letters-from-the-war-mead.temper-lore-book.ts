import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lettersFromTheWarMead = {
  id: "01a0d5f6-a29a-79ca-9172-416b3eb050be",
  type: "page-type/temper-lore-book",
  slug: "letters-from-the-war-mead",
  title: "Letters from the War: Mead!",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2846,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
