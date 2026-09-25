import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTaleOfPrincessAnurraame = {
  id: "01a0d5f5-7768-7e2c-8a26-7185e648f248",
  type: "page-type/temper-lore-book",
  slug: "the-tale-of-princess-anurraame",
  title: "The Tale of Princess Anurraame",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1980,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
