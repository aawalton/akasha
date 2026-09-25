import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const divinesAndTheNords = {
  id: "01a0d60b-8107-7c58-beca-c1400d993144",
  type: "page-type/temper-lore-book",
  slug: "divines-and-the-nords",
  title: "Divines and the Nords",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6224,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
