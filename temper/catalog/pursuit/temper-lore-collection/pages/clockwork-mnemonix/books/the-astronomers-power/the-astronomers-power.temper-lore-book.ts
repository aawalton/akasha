import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAstronomersPower = {
  id: "01a0d60a-a214-7957-b622-48d0422eefa6",
  type: "page-type/temper-lore-book",
  slug: "the-astronomers-power",
  title: "The Astronomer's Power",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4685,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
