import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const minersScrawledLetter = {
  id: "01a0d5f7-aa99-7e2f-936f-22302a801076",
  type: "page-type/temper-lore-book",
  slug: "miners-scrawled-letter",
  title: "Miner's Scrawled Letter",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4035,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
