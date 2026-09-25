import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aNewCultArises = {
  id: "01a0d60c-eb9a-7026-bd89-49021fee6815",
  type: "page-type/temper-lore-book",
  slug: "a-new-cult-arises",
  title: "A New Cult Arises",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7454,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
