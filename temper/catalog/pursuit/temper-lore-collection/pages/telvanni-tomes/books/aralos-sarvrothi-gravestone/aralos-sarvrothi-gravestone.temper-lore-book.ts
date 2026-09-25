import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aralosSarvrothiGravestone = {
  id: "01a0d60c-eb9a-7648-b883-5ad9c1151227",
  type: "page-type/temper-lore-book",
  slug: "aralos-sarvrothi-gravestone",
  title: "Aralos Sarvrothi Gravestone",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7759,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
